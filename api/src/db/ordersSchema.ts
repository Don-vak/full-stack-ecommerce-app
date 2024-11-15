import {
  integer,
  pgTable,
  varchar,
  timestamp,
  doublePrecision
} from "drizzle-orm/pg-core";
import { usersTable } from "./usersSchema";
import { productsTable } from "./productsSchema";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const ordersTable = pgTable("orders", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  createdAt: timestamp().notNull().defaultNow(),
  status: varchar({ length: 255 }).notNull().default("new"),
  userId: integer().references(() => usersTable.id).notNull(),
});

export const orderItemsTable = pgTable("order_items", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  orderId: integer().references(() => ordersTable.id).notNull(),
  productId: integer().references(() => productsTable.id).notNull(),
  quantity: integer().notNull(),
  price: doublePrecision().notNull(),

})

export const insertOrderSchema = createInsertSchema(ordersTable).omit({
  id: true,
  userId: true,
  status: true,
  createdAt: true
});

export const insertOrderItemschema = createInsertSchema(orderItemsTable).omit({
  id: true,
  orderId: true,

});

export const insertOrderWithItemsSchema = z.object({
  order: insertOrderSchema,
  items: z.array(insertOrderItemschema),
})