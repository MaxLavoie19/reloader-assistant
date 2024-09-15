import { ICaliber } from "@/models/ICaliber";
import { IManufacturer } from "@/models/IManufacturer";

export interface IBullet {
  id: string;
  caliber: ICaliber;
  manufacturer: IManufacturer;
  model: string;
  weightInGrains: number;
  g1BallisticCoefficient?: number;
  g7BallisticCoefficient?: number;
  sectionalDensity?: number;
  barcode?: string;
}

export interface ISnakeBullet {
  id: string;
  caliber: ICaliber;
  manufacturer: IManufacturer;
  model: string;
  weight_in_grains: number;
  g1_ballistic_coefficient?: number;
  g7_ballistic_coefficient?: number;
  sectional_density?: number;
  barcode?: string;
}
