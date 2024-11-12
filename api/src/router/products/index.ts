import { Router } from "express";
import {
  listProducts,
  getProductsById,
  createProducts,
  updateProducts,
  deleteProducts,
} from "./productcontroller";
import { validateData } from "../../middleware/validationmiddleware";
import { createproductSchema, updateproductSchema } from "../../db/productsSchema";



const router = Router();

router.get("/", listProducts)

router.get("/:id", getProductsById);

router.post("/", validateData(createproductSchema), createProducts);

router.put("/:id", validateData(updateproductSchema), updateProducts);

router.delete("/:id", deleteProducts);

export default router;