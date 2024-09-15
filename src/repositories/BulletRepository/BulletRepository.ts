import { IBullet } from "@/models/IBullet";
import { ICaliber } from "@/models/ICaliber";
import { IBulletRepository } from "@/repositories/BulletRepository/IBulletRepository";
import { IApiService } from "@/services/ApiService/IApiService";
import { Observable } from "rxjs";
import { uuid } from 'vue-uuid';

export class BulletRepository implements IBulletRepository {
  constructor(private apiService: IApiService) { }

  public getBullets(): Observable<IBullet[]> {
    const bullets = this.apiService.getList<IBullet>("bullets");
    return bullets;
  }
  public getBlankBullet(caliber: ICaliber): IBullet {
    return {
      id: uuid.v4(),
      model: '',
      weightInGrains: 0,
      caliber: caliber,
      manufacturer: {
        name: ''
      },
    };
  }
}
