import { IManufacturer } from "@/models/IManufacturer";

export interface IManufacturerRepository {
  getManufacturers(): Promise<IManufacturer[]>;
  getBlankManufacturer(): IManufacturer;
}
