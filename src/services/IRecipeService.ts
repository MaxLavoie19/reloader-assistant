import { IRecipe } from "@/models/IRecipe";

export interface IRecipeService {
  getRecipes(): IRecipe[];
  getEmptyRecipe(): IRecipe;
  saveRecipe(recipe: IRecipe): void;
  recipeToQr(recipe: IRecipe): void;
}
