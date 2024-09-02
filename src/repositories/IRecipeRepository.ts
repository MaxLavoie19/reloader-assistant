import { IRecipe } from "@/models/IRecipe";

export interface IRecipeRepository {
  getRecipes(): Promise<IRecipe[]>;
  getBlankRecipe(): IRecipe;
  saveRecipe(recipe: IRecipe): void;
  recipeToQr(recipe: IRecipe): void;
}
