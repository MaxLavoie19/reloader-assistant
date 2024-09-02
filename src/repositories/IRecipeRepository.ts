import { IRecipe } from "@/models/IRecipe";

export interface IRecipeRepository {
  getRecipes(): IRecipe[];
  getEmptyRecipe(): IRecipe;
  saveRecipe(recipe: IRecipe): void;
  recipeToQr(recipe: IRecipe): void;
}
