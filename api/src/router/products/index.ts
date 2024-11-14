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
import { verifySeller, verifyToken } from "../../middleware/authmiddleware";



const router = Router();

router.get("/", listProducts)

router.get("/:id", getProductsById);

router.post("/",verifyToken, verifySeller, validateData(createproductSchema), createProducts);

router.put(
  "/:id",
  verifyToken,
  verifySeller,
  validateData(updateproductSchema),
  updateProducts
);

router.delete("/:id", verifyToken, verifySeller, deleteProducts);

export default router;