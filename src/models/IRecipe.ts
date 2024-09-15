import { IBrass } from "@/models/IBrass";
import { IBullet, ISnakeBullet } from "@/models/IBullet";
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

export interface ISnakeRecipe {
  id: string;
  name: string;
  brass: IBrass;
  bullet: ISnakeBullet;
  bullet_seating_depth?: number;
  primer: IPrimer;
  powder: IPowder;
  min_powder_quantity_grains: number;
  max_powder_quantity_grains: number;
  cartridge_overal_length_mm?: number;
  cartridge_base_to_ogive_length_mm?: number;
  notes: string;
}
