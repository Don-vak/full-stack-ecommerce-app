import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { JwtPayload } from "jsonwebtoken";``



export function verifyToken(req:Request, res:Response, next:NextFunction) {
    const token = req.header('Authorization');

    if(!token) {
         res.status(401).json({ message: "Access denied" });
        return
    }

    try {
        const decoded = jwt.verify(token, "your-secret");

        // Assert that decoded is a JwtPayload
        if (typeof decoded !== "object" || !(decoded as JwtPayload).userId) {
          res.status(401).json({ message: "Access denied" });
          return;
        }

        // Access userId safely
        req.userId = (decoded as JwtPayload).userId;
        next();



        console.log(decoded);
        //
    } catch (err) {
        res.status(401).json({ message: "Access denied" });
    }
}
    

export function verifySeller(req: Request, res: Response, next: NextFunction) {
  const token = req.header("Authorization");

  if (!token) {
    res.status(401).json({ message: "Access denied" });
    return;
  }

  try {
    const decoded = jwt.verify(token, "your-secret");

    // Assert that decoded is a JwtPayload
    if (typeof decoded !== "object" || !(decoded as JwtPayload).userId) {
      res.status(401).json({ message: "Access denied" });
      return;
    }

    if ((decoded as JwtPayload).role !== "seller") {
      res.status(401).json({ message: "Access denied" });
      return;
    }

    // Access userId safely
    req.userId = (decoded as JwtPayload).userId;
    next();

    console.log(decoded);
    //
  } catch (err) {
    res.status(401).json({ message: "Access denied" });
  }
}