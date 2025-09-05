// src/config/db.ts
import 'dotenv/config';
import { Pool } from 'pg';
import {
  drizzle,
  NodePgDatabase,
  NodePgTransaction, // ✅ Correct name now
  NodePgQueryResultHKT,
} from 'drizzle-orm/node-postgres';
import { ExtractTablesWithRelations } from 'drizzle-orm';
import  {schema} from '@/config/schema';

const isProduction = process.env.NODE_ENV === 'production';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL!,
  ssl: isProduction ? { rejectUnauthorized: false } : false,
});

export const db = drizzle(pool, { schema });

export type DrizzleDb = typeof db;
// Transaction type
export type DrizzleTx = NodePgTransaction<
  typeof schema,                     // TFullSchema = your schema object
  ExtractTablesWithRelations<typeof schema> // TSchema = relational info
>;



// Can be either a normal db instance or an active transaction
export type DbOrTx = DrizzleDb | DrizzleTx;
