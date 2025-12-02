// controllers/lmsAnalytics.controller.js

import { Course } from "../models/course.model.js";
import Order from "../models/order.model.js";
import { User } from "../models/user.model.js";


// Reusable function: pure data layer
export const getLmsAnalyticsData = async () => {
  // Total registered users
  const totalUsers = await User.countDocuments();

  // Total courses
  const totalCourses = await Course.countDocuments();

  // Total enrollments + revenue from orders
  const salesData = await Order.aggregate([
    {
      $group: {
        _id: null,                  // group all orders together
        totalEnrollments: { $sum: 1 },          // count of orders
        totalRevenue: { $sum: "$totalAmount" }, // sum of totalAmount
      },
    },
  ]);

  const {
    totalEnrollments = 0,
    totalRevenue = 0,
  } = salesData[0] || {};

  return {
    users: totalUsers,
    courses: totalCourses,
    totalEnrollments,
    totalRevenue,
  };
};

// Express controller
export const getLmsAnalyticsController = async (req, res) => {
  try {
    const data = await getLmsAnalyticsData();
    return res.status(200).json(data);
  } catch (error) {
    console.error("Error in getLmsAnalyticsController:", error);
    return res.status(500).json({
      message: "Error fetching LMS analytics data",
      error: error.message,
    });
  }
};


// Same file: controllers/lmsAnalytics.controller.js

// Pure function: daily enrollments + revenue between start & end dates
export const getDailyEnrollmentData = async (startDate, endDate) => {
  try {
    const dailyData = await Order.aggregate([
      {
        $match: {
          createdAt: {
            $gte: startDate,
            $lte: endDate,
          },
        },
      },
      {
        $group: {
          _id: {
            $dateToString: { format: "%Y-%m-%d", date: "$createdAt" },
          },
          enrollments: { $sum: 1 },             // number of orders that day
          revenue: { $sum: "$totalAmount" },    // revenue that day
        },
      },
      { $sort: { _id: 1 } },
    ]);

    // Generate continuous date range
    const dateArray = getDatesInRange(startDate, endDate);

    // Merge DB results into full range
    return dateArray.map((date) => {
      const found = dailyData.find((item) => item._id === date);
      return {
        date,
        enrollments: found?.enrollments || 0,
        revenue: found?.revenue || 0,
      };
    });
  } catch (error) {
    throw error;
  }
};

// Same helper as ecommerce version
function getDatesInRange(startDate, endDate) {
  const dates = [];
  let currentDate = new Date(startDate);

  while (currentDate <= endDate) {
    dates.push(currentDate.toISOString().split("T")[0]);
    currentDate.setDate(currentDate.getDate() + 1);
  }

  return dates;
}

// Express handler, good for Postman / frontend
export const getDailyEnrollmentController = async (req, res) => {
  try {
    const { startDate, endDate } = req.query; 
    // e.g. /api/admin/lms/daily-enrollments?startDate=2025-12-01&endDate=2025-12-07

    if (!startDate || !endDate) {
      return res
        .status(400)
        .json({ message: "startDate and endDate are required" });
    }

    const start = new Date(startDate);
    const end = new Date(endDate);

    const data = await getDailyEnrollmentData(start, end);

    return res.status(200).json(data);
  } catch (error) {
    console.error("Error in getDailyEnrollmentController:", error);
    return res.status(500).json({
      message: "Error fetching daily enrollment data",
      error: error.message,
    });
  }
};
