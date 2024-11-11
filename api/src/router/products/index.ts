import { Router } from "express";
import { listProducts, getProductsById, createProducts, updateProducts, deleteProducts } from "./productcontroller";

const router = Router();

router.get("/", listProducts)

router.get("/:id", getProductsById);

router.post("/", createProducts);

router.put("/:id", updateProducts);

router.delete("/:id", deleteProducts);

export default router;