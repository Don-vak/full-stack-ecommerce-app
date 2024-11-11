import { Router } from "express";

const router = Router();

router.get("/", (req, res) => {
  res.send("Hello World!");
});

router.get("/", (req, res) => {
  res.send({ "the list of products": "here" });
});

router.post("/", (req, res) => {
  res.send({ "New product crwated": "here" });
});

export default router;