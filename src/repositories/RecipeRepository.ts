import { emptyRecipe, recipeA } from "@/data/recipe";
import { IRecipe } from "@/models/IRecipe";
import { IRecipeRepository } from "@/repositories/IRecipeRepository";
import { uuid } from 'vue-uuid';

export class RecipeRepository implements IRecipeRepository {
  public constructor() {}

  public getEmptyRecipe(): IRecipe {
    const emptyRecipeCopy = JSON.parse(JSON.stringify(emptyRecipe));
    emptyRecipeCopy.id = uuid.v4();
    return emptyRecipeCopy
  }

  public getRecipes(): IRecipe[] {
    return [recipeA, ];
  }

  public saveRecipe(): void {

  }

  public recipeToQr(): void {

  }
}
