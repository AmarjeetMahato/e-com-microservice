// src/config/db.ts
import 'dotenv/config';
import { Pool } from 'pg';
import { drizzle } from 'drizzle-orm/node-postgres';

const isProduction = process.env.NODE_ENV === 'production';

// Create a PostgreSQL pool
const pool = new Pool({
  connectionString: process.env.DATABASE_URL!,
   ssl: isProduction
    ? { rejectUnauthorized: false } // cloud / production
    : false,
});

// Export the Drizzle ORM instance
export const db = drizzle(pool);
