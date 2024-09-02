import { blankRecipe, recipeA } from "@/data/recipe";
import { IRecipe } from "@/models/IRecipe";
import { IRecipeRepository } from "@/repositories/RecipeRepository/IRecipeRepository";
import { uuid } from 'vue-uuid';

export class RecipeRepository implements IRecipeRepository {
  public constructor() {}

  public getBlankRecipe(): IRecipe {
    const blankRecipeCopy = JSON.parse(JSON.stringify(blankRecipe));
    blankRecipeCopy.id = uuid.v4();
    return blankRecipeCopy
  }

  public getRecipes(): Promise<IRecipe[]> {
    return Promise.resolve([recipeA, ]);
  }

  public saveRecipe(recipe: IRecipe): Promise<void> {

  }
}
