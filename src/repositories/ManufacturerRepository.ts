import { hodgdon, hornady, unisGinex } from "@/data/manufacturer";
import { IManufacturer } from "@/models/IManufacturer";
import { IManufacturerRepository as IManufacturerRepository } from "@/repositories/IManufacturerRepository";

export class ManufacturerRepository implements IManufacturerRepository {
  public async getManufacturers(): Promise<IManufacturer[]> {
    return Promise.resolve([hornady, hodgdon, unisGinex]);
  }

  public getBlankManufacturer(): IManufacturer {
    return { name: '' };
  }
}
