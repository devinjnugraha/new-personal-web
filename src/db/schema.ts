import { pgTable, pgEnum, uuid, text, timestamp, index } from 'drizzle-orm/pg-core'

export const chatSessions = pgTable(
  'chat_sessions',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    fingerprint: text('fingerprint').notNull(),
    ip: text('ip').notNull(),
    createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow()
  },
  (table) => [
    index('idx_chat_sessions_ip').on(table.ip),
    index('idx_chat_sessions_fingerprint').on(table.fingerprint),
    index('idx_chat_sessions_created_at').on(table.createdAt)
  ]
)

export const messageRoleEnum = pgEnum('message_role', ['user', 'assistant'])

export const chatMessages = pgTable(
  'chat_messages',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    chatId: uuid('chat_id')
      .notNull()
      .references(() => chatSessions.id),
    role: messageRoleEnum('role').notNull(),
    content: text('content').notNull(),
    createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow()
  },
  (table) => [
    index('idx_chat_messages_chat_id').on(table.chatId)
  ]
)
