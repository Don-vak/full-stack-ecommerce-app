import {Request, Response} from 'express';
import  db  from "../../db/index";
import { productsTable } from "../../db/productsSchema";
import { eq } from "drizzle-orm";

export async function listProducts(req: Request, res: Response) {
  try{
    const products = await db.select().from(productsTable);
    res.status(200).json(products);

  }catch(err){
     res.status(500).send(err);
  }
       
    }

 export async function getProductsById(req : Request, res: Response) {
  try {
    const [product] = await db
      .select()
      .from(productsTable)
      .where(eq(productsTable.id, Number(req.params.id)));

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json(product);
    } catch (err) {
    res.status(500).send(err);
    }
     
    }

export async function createProducts(req: Request, res: Response) {
  console.log(req.body); 

  try{
      const [product] = await db
        .insert(productsTable)
        .values(req.body)
        .returning();
      res.status(201).json(product);

  }catch(err){
    res.status(500).send(err);
  }

}

export async function updateProducts(req: Request, res: Response) {
  try{
    const id = Number(req.params.id);
    const updatedFields = req.body;

    const [product] = await db. update(productsTable).set(updatedFields).where(eq(productsTable.id, id)).returning();

    if (product) {
      return res.status(200).json(product);
    }else{
      return res.status(404).json({ message: "Product not found" });
    }

  }catch(err){
    res.status(500).send(err);
  }

}

export async function deleteProducts(req: Request, res: Response) {
  try{
    const id = Number(req.params.id);
    const deletedProduct = await db.delete(productsTable).where(eq(productsTable.id, id )).returning();

    if (deletedProduct) {
      return res.status(204).json({ message: "Product not found" });
    }else{
      return res.status(404).json({ message: "Product not found" });
    }
    
  }catch(err){
    res.status(500).send(err);
  }
 
}