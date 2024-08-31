import { emptyRecipe, recipeA } from "@/data/recipe";
import { IRecipe } from "@/models/IRecipe";
import { IRecipeService } from "@/services/IRecipeService";

export class RecipeService implements IRecipeService {
  public constructor() {}

  public getEmptyRecipe(): IRecipe {
    return JSON.parse(JSON.stringify(emptyRecipe));
  }

  public getRecipes(): IRecipe[] {
    return [recipeA, ];
  }

  public saveRecipe(): void {

  }

  public recipeToQr(): void {

  }
}
