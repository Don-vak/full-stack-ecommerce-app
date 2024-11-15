import { Router } from "express";
import {
  listProducts,
  getProductsById,
  createProducts,
  updateProducts,
  deleteProducts,
} from "./productcontroller.js";
import { validateData } from "../../middleware/validationmiddleware.js";
import { createproductSchema, updateproductSchema } from "../../db/productsSchema.js";
import { verifySeller, verifyToken } from "../../middleware/authmiddleware.js";



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