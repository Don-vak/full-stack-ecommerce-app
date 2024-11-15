import { Request, Response, NextFunction } from "express";
import { ordersTable, orderItemsTable } from "../../db/ordersSchema.js";
import db from "../../db/index.js";
import { eq } from "drizzle-orm";

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

export async function listOrders(req: Request, res: Response) {
  try {
    const orders = await db.select().from(ordersTable);
    res.json(orders);
  } catch (error) {
    res.status(500).send(error);
  }
}


export async function getOrder(req: Request, res: Response) {
  try {
    const id = parseInt(req.params.id);

    // TODO: required to setup the relationship
    // const result = await db.query.ordersTable.findFirst({
    //   where: eq(ordersTable.id, id),
    //   with: {
    //     items: true,
    //   },
    // });

    const orderWithItems = await db
      .select()
      .from(ordersTable)
      .where(eq(ordersTable.id, id))
      .leftJoin(orderItemsTable, eq(ordersTable.id, orderItemsTable.orderId));

    if (orderWithItems.length === 0) {
      res.status(404).send("Order not found");
    }

    const mergedOrder = {
      ...orderWithItems[0].orders,
      items: orderWithItems.map((oi) => oi.order_items),
    };

    res.status(200).json(mergedOrder);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
}

export async function updateOrder(req: Request, res: Response) {
  try {
    const id = parseInt(req.params.id);

    const [updatedOrder] = await db
      .update(ordersTable)
      .set(req.body)
      .where(eq(ordersTable.id, id))
      .returning();

    if (!updatedOrder) {
      res.status(404).send("Order not found");
    } else {
      res.status(200).json(updatedOrder);
    }
  } catch (error) {
    res.status(500).send(error);
  }
}