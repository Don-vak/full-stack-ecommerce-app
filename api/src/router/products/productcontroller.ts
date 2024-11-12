import { Request, Response, NextFunction } from "express";
import db from "../../db/index";
import { productsTable } from "../../db/productsSchema";
import { eq } from "drizzle-orm";
import _ from "lodash";
import { createproductSchema } from "../../db/productsSchema";

export async function listProducts(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const products = await db.select().from(productsTable);
    res.status(200).json(products);
  } catch (err) {
    next(err);
  }
}

export async function getProductsById(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const [product] = await db
      .select()
      .from(productsTable)
      .where(eq(productsTable.id, Number(req.params.id)));

    if (!product) {
      res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json(product);
  } catch (err) {
    next(err);
  }
}

export async function createProducts(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
  
   
    const [product] = await db
      .insert(productsTable)
      .values(req.cleanBody)
      .returning();
    res.status(201).json(product);
  } catch (err) {
    next(err);
  }
}

export async function updateProducts(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const id = Number(req.params.id);
    const updatedFields = req.cleanBody;


    const [product] = await db
      .update(productsTable)
      .set(updatedFields)
      .where(eq(productsTable.id, id))
      .returning();

    if (!product) {
       res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json(product);
  } catch (err) {
    next(err);
  }
}

export async function deleteProducts(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const id = Number(req.params.id);
    const [deletedProduct] = await db
      .delete(productsTable)
      .where(eq(productsTable.id, id))
      .returning();

    if (!deletedProduct) {
       res.status(404).json({ message: "Product not found" });
    }
    res.status(204).send();
  } catch (err) {
    next(err);
  }
}
