import { configDotenv } from "dotenv";

configDotenv({quiet:true})


export const ENV={
    MONG_URI:process.env.MONG_URI,
    PORT :process.env.PORT
}