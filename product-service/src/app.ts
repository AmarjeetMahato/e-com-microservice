
import "reflect-metadata";
import "./core/utils/container"
import express, { NextFunction, Request, Response } from "express"
import morgan from "morgan"
import globalErrorHandler from "./globalError/globalErrorHandler";
import productRoutes from "@/api/rest-api/product.routes"
import productItemRoutes from "@/api/rest-api/productItem.routes"


export const app = express()
app.use(express.json())
app.use(morgan("dev"))


app.use("/api/v1/product", productRoutes)
app.use("/api/v1/productItem", productItemRoutes)

app.use(globalErrorHandler);