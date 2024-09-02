import { IBrass } from "@/models/IBrass";
import { IBullet } from "@/models/IBullet";
import { IPowder } from "@/models/IPowder";
import { IPrimer } from "@/models/IPrimer";

export interface IRecipe {
  id: string;
  name: string;
  brass: IBrass;
  bullet: IBullet;
  bulletSeatingDepth?: number;
  primer: IPrimer;
  powder: IPowder;
  minPowderQuantityGrains: number;
  maxPowderQuantityGrains: number;
  cartridgeOveralLengthMm?: number;
  cartridgeBaseToOgiveLengthMm?: number;
  notes: string;
}
