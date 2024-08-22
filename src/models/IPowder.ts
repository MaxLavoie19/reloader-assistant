import { IManufacturer } from "@/models/IManufacturer";

export interface IPowder {
  id: string;
  name: string;
  manufacturer: IManufacturer;
  barcode?: string;
}
