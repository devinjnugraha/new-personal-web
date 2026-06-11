import { neon } from '@neondatabase/serverless'
import { drizzle } from 'drizzle-orm/neon-http'
import * as schema from '@/db/schema'
import { appConfig } from '@/lib/app-config'

const sql = neon(appConfig.getDatabaseUrl())

export const db = drizzle(sql, { schema })
