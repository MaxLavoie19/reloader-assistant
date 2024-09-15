import { IBullet, ISnakeBullet } from "@/models/IBullet";

export function bulletSnakeToCamelMapper(snakeBullet: ISnakeBullet): IBullet {
  const bullet: IBullet = {
    id: snakeBullet.id,
    caliber: snakeBullet.caliber,
    manufacturer: snakeBullet.manufacturer,
    model: snakeBullet.model,
    weightInGrains: snakeBullet.weight_in_grains,
    g1BallisticCoefficient: snakeBullet.g1_ballistic_coefficient,
    g7BallisticCoefficient: snakeBullet.g7_ballistic_coefficient,
    sectionalDensity: snakeBullet.sectional_density,
    barcode: snakeBullet.barcode,
  };
  return bullet;
}
