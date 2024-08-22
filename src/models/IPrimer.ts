import { IManufacturer } from "@/models/IManufacturer";

export interface IPrimer {
  id: string;
  name: string;
  size: string;
  manufacturer: IManufacturer;
  barcode?: string;
}
