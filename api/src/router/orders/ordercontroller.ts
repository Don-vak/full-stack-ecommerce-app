import { Request, Response, NextFunction } from "express";
import { ordersTable, orderItemsTable } from "../../db/ordersSchema.js";
import db from "../../db/index.js";

export async function createOrder(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const { order, items } = req.body; // Ensure you're using `req.body`
    const userId = req.userId;

    if (!userId) {
       res.status(401).json({ message: "Access denied" });
    }

    // Create the order
    const [newOrder] = await db
      .insert(ordersTable)
      .values({ userId, ...order })
      .returning();

    // Add order items
    const orderItems = items.map((item: any) => ({
      ...item,
      orderId: newOrder.id,
    }));

    const newOrderItems = await db
      .insert(orderItemsTable) // Ensure this targets the correct table for order items
      .values(orderItems)
      .returning();

    // Respond with the created order
    res.status(201).json({ ...newOrder, items: newOrderItems });
  } catch (err: any) {
    console.error("Error creating order:", err); // Log error for debugging
    res.status(400).json({
      error: "Failed to create order",
      details: err.message || "Invalid order data",
    });
  }
}
