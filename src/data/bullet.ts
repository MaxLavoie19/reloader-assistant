import { caliber6_5mm, caliber7_62 } from "@/data/caliber";
import { hornady } from "@/data/manufacturer";
import { IBullet } from "@/models/IBullet";

export const bullet6_5: IBullet = {
  id: "bullet6_5_ID",
  caliber: caliber6_5mm,
  manufacturer: hornady,
  model: "BTHP Match",
  weightInGrains: 140,
  g1BallisticCoefficient: 0.580,
  g7BallisticCoefficient: undefined,
  sectionalDensity: 0.287,
}

export const bullet7_62: IBullet = {
  id: "bullet7_62_ID",
  caliber: caliber7_62,
  manufacturer: hornady,
  model: "BTHP Match",
  weightInGrains: 160,
  g1BallisticCoefficient: 0.580,
  g7BallisticCoefficient: undefined,
  sectionalDensity: 0.287,
}
