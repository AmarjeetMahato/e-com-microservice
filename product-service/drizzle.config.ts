
import { defineConfig } from 'drizzle-kit';
import * as dotenv from "dotenv"

dotenv.config()

export default defineConfig({
  out: './src/migrations',
  schema: './src/config/schema/**/*.ts', 
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
});
