import { hodgdon, hornady, unisGinex } from "@/data/manufacturer";
import { IManufacturer } from "@/models/IManufacturer";
import { IManufacturerRepository } from "@/repositories/ManufacturerRepository/IManufacturerRepository";
import { Observable } from "rxjs";

export class ManufacturerRepository implements IManufacturerRepository {
  public getManufacturers(): Observable<IManufacturer[]> {
    return new Observable((observer) => observer.next([hornady, hodgdon, unisGinex]));
  }

  public getBlankManufacturer(): IManufacturer {
    return { name: '' };
  }
}
