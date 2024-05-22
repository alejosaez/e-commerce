// routes.ts

import { Router } from "express";
import { getProducts, getProductById, createProduct, updateProduct,getProductByCategory } from "../controllers/product.controller";

const router = Router();

router.get("/", getProducts);
router.get("/:id", getProductById);
router.post("/", createProduct);
router.put("/edit/:id", updateProduct);
router.get("/category/:id", getProductByCategory);

export default router;
