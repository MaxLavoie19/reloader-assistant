import { IRecipe } from "@/models/IRecipe";
import { Observable } from "rxjs";

export interface IRecipeRepository {
  getRecipes(): Observable<IRecipe[]>;
  getBlankRecipe(): IRecipe;
  saveRecipe(recipe: IRecipe): void;
}
