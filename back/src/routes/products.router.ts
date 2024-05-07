// routes.ts

import { Router } from "express";
import { getProducts, getProductById, createProduct, updateProduct } from "../controllers/product.controller";

const router = Router();

router.get("/", getProducts);
router.get("/:id", getProductById);
router.post("/", createProduct);
router.put("/:id", updateProduct);

export default router;
