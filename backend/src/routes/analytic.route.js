// routes/lmsAnalytics.route.js
import express from "express";
import { adminRoute, protectRoute } from "../middleware/auth.middleware.js";
import { getDailyEnrollmentController, getLmsAnalyticsController } from "../controllers/analytic.controller.js";

const analyticRoute = express.Router();

// Overview: total users, courses, enrollments, revenue
analyticRoute.get(
  "/overview",
  protectRoute,
  adminRoute,
  getLmsAnalyticsController
);

// Daily: ?startDate=YYYY-MM-DD&endDate=YYYY-MM-DD
analyticRoute.get(
  "/daily-enrollments",
 protectRoute,
 adminRoute,
  getDailyEnrollmentController
);

export default analyticRoute;
