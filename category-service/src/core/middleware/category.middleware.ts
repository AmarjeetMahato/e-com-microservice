import { Request, Response, NextFunction } from "express";
import { z } from "zod";

export const ValidateRequest = <T>(schema: z.ZodSchema<T>) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    const result = schema.safeParse(req.body);

    if (!result.success) {
      const formattedError = result.error.format();
      const fieldErrors = Object.entries(formattedError)
        .filter(([key]) => key !== '_errors')
        .reduce((acc, [key, value]) => {
          acc[key] = Array.isArray((value as any)?._errors) ? (value as any)._errors : [];
          return acc;
        }, {} as Record<string, string[]>);

      res.status(400).json({
        message: "Validation failed",
        errors: fieldErrors,
      });
      return;
    }

    req.body = result.data;
    next();
  };
};