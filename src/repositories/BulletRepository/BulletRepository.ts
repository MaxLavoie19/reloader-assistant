import { bullet6_5, bullet7_62 } from "@/data/bullet";
import { IBullet } from "@/models/IBullet";
import { ICaliber } from "@/models/ICaliber";
import { IBulletRepository } from "@/repositories/BulletRepository/IBulletRepository";
import { Observable } from "rxjs";
import { uuid } from 'vue-uuid';

export class BulletRepository implements IBulletRepository {

  public getBullets(): Observable<IBullet[]> {
    return new Observable((observer) => observer.next([bullet6_5, bullet7_62]));
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
