import { configDotenv } from "dotenv";

configDotenv({quiet:true})


export const ENV={
    MONG_URI:process.env.MONG_URI,
    PORT :process.env.PORT,
    ADMIN :process.env.ADMIN,
    TOKEN_SECRET:process.env.TOKEN_SECRET,
    CLOUD_NAME:process.env.CLOUD_NAME,
    CLOUDINARY_API_SECRET:process.env.CLOUDINARY_API_SECRET,
    CLOUDINARY_API_KEY:process.env.CLOUDINARY_API_KEY,
    UPSTASH_REDIS_REST_URL:process.env.UPSTASH_REDIS_REST_URL,
    UPSTASH_REDIS_REST_TOKEN:process.env.UPSTASH_REDIS_REST_TOKEN

}