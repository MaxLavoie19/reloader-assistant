import { IRecipe } from "@/models/IRecipe";

export interface IRecipeService {
  getRecipes(): IRecipe[];
  getEmptyRecipe(): IRecipe;
}
