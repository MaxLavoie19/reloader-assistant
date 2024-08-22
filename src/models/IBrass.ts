import { IChambering } from "@/models/IChambering";
import { IManufacturer } from "@/models/IManufacturer";

export interface IBrass {
  id: string,
  chambering: IChambering;
  manufacturer: IManufacturer;
  barcode?: string;
}
