import { IManufacturer } from "@/models/IManufacturer";
import { IManufacturerRepository } from "@/repositories/ManufacturerRepository/IManufacturerRepository";
import { IApiService } from "@/services/ApiService/IApiService";
import { Observable } from "rxjs";

export class ManufacturerRepository implements IManufacturerRepository {
  constructor(private apiService: IApiService) { }

  public getManufacturers(): Observable<IManufacturer[]> {
    const manufacturers = this.apiService.getList<IManufacturer>("manufacturers");
    return manufacturers;
  }

  public getBlankManufacturer(): IManufacturer {
    return { name: '' };
  }
}
