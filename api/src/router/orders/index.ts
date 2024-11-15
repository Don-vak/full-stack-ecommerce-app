import { Router } from "express";
import { createOrder, listOrders, getOrder} from "./ordercontroller.js";
import { validateData } from "../../middleware/validationmiddleware.js";
import { insertOrderSchema, insertOrderWithItemsSchema, updateOrderSchema } from "../../db/ordersSchema.js";
import { verify } from "jsonwebtoken";
import { verifyToken } from "../../middleware/authmiddleware.js";


const router = Router();

router.post('/', verifyToken, validateData (insertOrderWithItemsSchema), createOrder)
router.get('/:id', verifyToken , getOrder)
router.put("/:id", verifyToken, validateData(updateOrderSchema), updateOrder);

export default router