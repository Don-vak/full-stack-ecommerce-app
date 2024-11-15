import { Router } from "express";
import { createOrder } from "./ordercontroller.js";
import { validateData } from "../../middleware/validationmiddleware.js";
import { insertOrderSchema, insertOrderWithItemsSchema } from "../../db/ordersSchema.js";
import { verify } from "jsonwebtoken";
import { verifyToken } from "../../middleware/authmiddleware.js";

const router = Router();

router.post('/', verifyToken, validateData (insertOrderWithItemsSchema), createOrder)

export default router