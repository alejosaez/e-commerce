import { Category } from "../entities/Category";
import { CategoryRepository } from "../repositories/category.respository";

export const getCategoriesService = async (): Promise<Category[]> => {
  return await CategoryRepository.find();
};

