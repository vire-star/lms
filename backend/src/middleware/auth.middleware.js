import { ENV } from "../helpers/env.js";
import { User } from "../models/user.model.js";
import jwt from 'jsonwebtoken'
export const protectRoute = async (req, res, next) => {
	try {
		const accessToken = req.cookies.token;

		if (!accessToken) {
			return res.status(401).json({ message: "Unauthorized - No access token provided" });
		}

		// console.log(accessToken)
		
		try {
			const decoded = jwt.verify(accessToken, ENV.TOKEN_SECRET);
			// console.log(decoded)
			const user = await User.findById(decoded.userId).select("-password");

			if (!user) {
				return res.status(401).json({ message: "User not found" });
			}

			req.user = user;

			next();
		} catch (error) {
			if (error.name === "TokenExpiredError") {
				return res.status(401).json({ message: "Unauthorized - Access token expired" });
			}
			throw error;
		}
	} catch (error) {
		console.log("Error in protectRoute middleware", error.message);
		return res.status(401).json({ message: "Unauthorized - Invalid access token" });
	}
};