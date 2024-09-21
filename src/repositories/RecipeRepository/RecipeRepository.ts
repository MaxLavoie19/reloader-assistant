import { blankRecipe, recipeA } from "@/data/recipe";
import { recipeSnakeToCamelMapper } from "@/mappers/RecipeSnakeToCamelMapper";
import { IRecipe, ISnakeRecipe } from "@/models/IRecipe";
import { IRecipeRepository } from "@/repositories/RecipeRepository/IRecipeRepository";
import { IApiService } from "@/services/ApiService/IApiService";
import { map, Observable } from "rxjs";
import { uuid } from 'vue-uuid';

export class RecipeRepository implements IRecipeRepository {
  public constructor(private apiService: IApiService) {}

  public getBlankRecipe(): IRecipe {
    const blankRecipeCopy = JSON.parse(JSON.stringify(blankRecipe));
    blankRecipeCopy.id = uuid.v4();
    return blankRecipeCopy;
  }

  public getRecipes(): Observable<IRecipe[]> {
    return this.apiService.getList<IRecipe>("recipes").pipe(map((recipes) => {
      return recipes.map((recipe) => recipeSnakeToCamelMapper((recipe as unknown) as ISnakeRecipe));
    }));
  }

  public saveRecipe(recipe: IRecipe): void {
    this.apiService.post('recipe', recipe).subscribe();
  }
}
