import { emptyRecipe, recipeA } from "@/data/recipe";
import { IRecipe } from "@/models/IRecipe";
import { IRecipeService } from "@/services/IRecipeService";
import { uuid } from 'vue-uuid';

export class RecipeService implements IRecipeService {
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
