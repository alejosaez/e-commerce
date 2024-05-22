import { Request, Response } from "express";
import { catchedController } from "../utils/catchedController";
import {
  getProductsService,
  getProductByIdService,
  createProductService,
  updateProductService,
  getProductByCategoryService
} from "../services/products.service";

export const getProducts = catchedController(
  async (req: Request, res: Response) => {
    const products = await getProductsService();
    res.json(products);
  }
);

export const getProductById = async (req: Request, res: Response) => {
  const productId = parseInt(req.params.id);
  try {
    const product = await getProductByIdService(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json(product);
  } catch (error) {
    console.error("Error fetching product:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};



export const getProductByCategory = async (req: Request, res: Response) => {
  const productId = parseInt(req.params.id);
  try {
    const product = await getProductByCategoryService(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json(product);
  } catch (error) {
    console.error("Error fetching product:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};


export const createProduct = async (req: Request, res: Response) => {
  const productData = req.body;

  try {
    const newProduct = await createProductService(productData);
    res.status(201).json(newProduct);
  } catch (error) {
    console.error("Error creating product:", error);
    res.status(500).json({ error: "Error creating product" });
  }
};

export const updateProduct = async (req: Request, res: Response) => {
  const productId = parseInt(req.params.id);

  try {
    const product = await getProductByIdService(productId);
    if (!product) {
      return res.status(404).json({ error: "El producto no fue encontrado." });
    }

    const { name,image, description, price, stock } = req.body;
    console.log("product update: ", name,image, description, price, stock)

    await updateProductService(product, { name,image, description, price, stock });

    return res.status(200).json({ message: "El producto fue actualizado exitosamente." });
  } catch (error) {
    console.error("Error al actualizar el producto:", error);
    return res.status(500).json({ error: "Error interno del servidor." });
  }
};

