import {Router} from "express";
import { createuserSchema, usersTable, loginSchema } from "../../db/usersSchema";
import { validateData } from "../../middleware/validationmiddleware";
import bcrypt from "bcryptjs";
import db from "../../db/index";
import { eq } from "drizzle-orm";
import { Request, Response } from "express";
const router = Router();
import jwt from "jsonwebtoken";

router.post("/register", validateData(createuserSchema), async (req, res) => {

    try{
      const data =req.cleanBody
      data.password = await bcrypt.hash(data.password, 10);

      const [user] = await db.insert(usersTable).values(data).returning();
    
      res.status(201).json({user})
    } catch (err) {
      res.status(500).json({ error: "something went wrong" });
    }
   
})

router.post(
  "/login",
  validateData(loginSchema),
  async (req: Request, res: Response): Promise<void> => {
    try {
      const { email, password } = req.cleanBody; 
      const [user] = await db
        .select()
        .from(usersTable)
        .where(eq(usersTable.email, email));

      if (!user) {
         res.status(401).json({ message: "Authentication failed" });
      }

      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        res.status(401).json({ message: "Authentication failed" });
      }
      const token = jwt.sign(
        { userId: user.id, role: user.role },
        'your-secret',
        { expiresIn: "30d" }
      );
      res.status(200).json({ token, user});



    } catch (err) {
      console.error("Error during login:", err);
      res.status(500).json({ message: "An internal server error occurred" });
    }
  }
);

export default router;