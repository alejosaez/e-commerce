// routes.ts

import { Router } from "express";
import { getAllCategories } from "../controllers/categories.cotroller";

const router = Router();

router.get("/", getAllCategories);

export default router;
