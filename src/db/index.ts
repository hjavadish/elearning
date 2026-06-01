import type { IDatabase } from './interface'
import { MockDatabase } from './mock/MockDatabase'

/**
 * نقطه اتصال به دیتابیس.
 * فعلاً MockDatabase — بعداً مثلاً:
 *   import { PostgresDatabase } from './postgres/PostgresDatabase'
 *   return import.meta.env.VITE_DB === 'postgres' ? new PostgresDatabase() : new MockDatabase()
 */
let instance: IDatabase | null = null

export function getDatabase(): IDatabase {
  if (!instance) {
    instance = new MockDatabase()
  }
  return instance
}

export type { IDatabase }
