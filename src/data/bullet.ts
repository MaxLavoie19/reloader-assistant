import { caliber6_5mm } from "@/data/caliber";
import { hornady } from "@/data/manufacturer";
import { IBullet } from "@/models/IBullet";

export const bullet6_5: IBullet = {
  caliber: caliber6_5mm,
  manufacturer: hornady,
  model: "BTHP Match",
  weightInGrains: 140,
  g1BallisticCoefficient: 0.580,
  g7BallisticCoefficient: undefined,
  sectionalDensity: 0.287,
}
