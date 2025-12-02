
import { ENV } from "../helpers/env.js";
import { stripe } from "../helpers/stripe.js";
import { Course } from "../models/course.model.js";
import Order from "../models/order.model.js";
import { User } from "../models/user.model.js";
// import User from "../models/user.model.js";

export const createCheckoutSession = async (req, res) => {
  try {
    const { products } = req.body; // ✅ Products array accept karo

    // ✅ Validation
    if (!products || products.length === 0) {
      return res.status(401).json({ 
        message: "At least one course is required" 
      });
    }

    // ✅ Extract course ID from first product (single course purchase)
    const courseId = products[0]._id;

    // ✅ Course database se fetch karo
    const course = await Course.findById(courseId);
    
    if (!course) {
      return res.status(404).json({ 
        message: "Course not found" 
      });
    }

    // ✅ Duplicate purchase check
    const alreadyPurchased = await Order.findOne({
      user: req.user._id,
      course: courseId,
    });

    if (alreadyPurchased) {
      return res.status(201).json({ 
        message: "Course already purchased" 
      });
    }

    // ✅ Use product data from request (ya database se - better)
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "inr",
            product_data: {
              name: products[0].name, // Frontend se ya course.courseTitle
              images: [products[0].image], // Frontend se ya course.courseThumbnail
            },
            unit_amount: Math.round(products[0].price * 100), // Frontend price
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${ENV.CLIENT_URL}/purchase?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${ENV.CLIENT_URL}/course/${courseId}`,
      metadata: {
        userId: req.user._id.toString(),
        courseId: courseId, // ✅ Course ID from products array
        coursePrice: products[0].price,
      },
    });

    return res.status(200).json({
      success: true,
      sessionId: session.id,
      url: session.url,
    });
  } catch (error) {
    console.error("Error processing checkout:", error);
    return res.status(500).json({
      success: false,
      message: "Error processing checkout",
      error: error.message,
    });
  }
};



export const checkoutSuccess = async (req, res) => {
  try {
    const { sessionId } = req.body;

    if (!sessionId) {
      return res.status(400).json({ message: "sessionId is required" });
    }

    // ✅ Check if order already exists
    const existingOrder = await Order.findOne({ stripeSessionId: sessionId });

    if (existingOrder) {
      console.log("Order already exists for this session:", sessionId);
      return res.status(200).json({
        success: true,
        message: "Order already created",
        orderId: existingOrder._id,
      });
    }

    // ✅ Retrieve Stripe session
    const session = await stripe.checkout.sessions.retrieve(sessionId);

    if (session.payment_status === "paid") {
      
      // ✅ Metadata se courseId extract karo (products nahi!)
      const courseId = session.metadata.courseId;
      const userId = session.metadata.userId;

      // ✅ Single course order create karo
      const newOrder = new Order({
        user: userId,
        course: courseId, // ✅ Single course field
        totalAmount: session.amount_total / 100,
        stripeSessionId: sessionId,
      });

      await newOrder.save();

      // ✅ Clear user cart (optional)
      await User.findByIdAndUpdate(userId, {
        $set: { cartItems: [] },
      });

      // ✅ (Optional) Add course to user's purchased courses
      await User.findByIdAndUpdate(userId, {
        $addToSet: { purchasedCourses: courseId },
      });

      return res.status(200).json({
        success: true,
        message: "Payment successful, course purchased!",
        orderId: newOrder._id,
      });
    }

    return res.status(401).json({
      success: false,
      message: "Payment not completed",
    });
  } catch (error) {
    console.error("Error processing successful checkout:", error);
    return res.status(500).json({
      message: "Error processing successful checkout",
      error: error.message,
    });
  }
};
