import { bulletSnakeToCamelMapper } from "@/mappers/BulletSnakeToCamelMapper";
import { IRecipe, ISnakeRecipe } from "@/models/IRecipe";

export function recipeSnakeToCamelMapper(snakeRecipe: ISnakeRecipe): IRecipe {
  const recipe: IRecipe = {
    id: snakeRecipe.id,
    name: snakeRecipe.name,
    brass: snakeRecipe.brass,
    bullet: bulletSnakeToCamelMapper(snakeRecipe.bullet),
    primer: snakeRecipe.primer,
    powder: snakeRecipe.powder,
    minPowderQuantityGrains: snakeRecipe.min_powder_quantity_grains,
    maxPowderQuantityGrains: snakeRecipe.max_powder_quantity_grains,
    notes: snakeRecipe.notes
  };
  return recipe;
}
