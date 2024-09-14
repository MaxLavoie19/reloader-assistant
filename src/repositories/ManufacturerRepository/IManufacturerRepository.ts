import { IManufacturer } from "@/models/IManufacturer";
import { Observable } from "rxjs";

export interface IManufacturerRepository {
  getManufacturers(): Observable<IManufacturer[]>;
  getBlankManufacturer(): IManufacturer;
}
