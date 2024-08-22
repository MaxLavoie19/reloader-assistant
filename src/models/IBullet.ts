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
