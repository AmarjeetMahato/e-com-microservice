
import "reflect-metadata";
import "./core/utils/container"
import express from "express"
import morgan from "morgan"
import categoryRoutes from "@/api/rest-api/category.routes"
import globalErrorHandler from "@/core/utils/globalErrorHandler"
import redis from "./config/redis/redis";



export const app = express()
app.use(express.json())
app.use(morgan("dev"))


redis.set("test key", "Hello Redis").then(()=> console.log("Redis test key set"));

app.use("/api/v1/category", categoryRoutes)

app.use(globalErrorHandler);