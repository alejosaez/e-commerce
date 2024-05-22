import { Product } from "../entities/Product";
import { ProductRepository } from "../repositories/product.repository";

interface SingleProduct {
  name: string;
  description: string;
  price: number;
  stock: number;
  image: string;
  categoryId: number;
}

interface ProductUpdateData {
  name?: string;
  description?: string;
  price?: number;
  stock?: number;
  image?: string;
}

export const checkProductExists = async (itemId: number): Promise<boolean> => {
  const item: Product | null = await ProductRepository.findOneBy({
    id: itemId,
  });
  return !!item;
};

export const getProductsService = async (): Promise<Product[]> => {
  return await ProductRepository.find();
};


export const getProductByIdService = async (productId: number): Promise<Product | null> => {
  return await ProductRepository.findOneById(productId);
};


export const getProductByCategoryService = async (categoryId: number): Promise<Product[] | null> => {
  try {
    const products = await ProductRepository.find({
      where: { categoryId: categoryId }
    });
    return products;
  } catch (error) {
    console.error('Error getting products by category:', error);
    throw new Error('Error getting products by category');
  }
};





export const createProductService = async (productData: SingleProduct): Promise<Product> => {
  try {
    const newProduct = ProductRepository.create(productData);
    await ProductRepository.save(newProduct);
    return newProduct;
  } catch (error) {
    console.error('Error creating product:', error);
    throw new Error('Error creating product');
  }
};

export const updateProductService = async (product: Product, updateData: ProductUpdateData): Promise<void> => {
  try {
    await ProductRepository.update(product.id, updateData);
    console.log("produc: ", product)
    console.log("produc data: ", updateData)
  } catch (error) {
    console.error('Error al actualizar el producto en el servicio:', error);
    throw new Error('Error al actualizar el producto en el servicio.');
  }
};