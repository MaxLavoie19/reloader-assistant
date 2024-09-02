import { bullet6_5, bullet7_62 } from "@/data/bullet";
import { IBullet } from "@/models/IBullet";
import { ICaliber } from "@/models/ICaliber";
import { IBulletRepository } from "@/repositories/IBulletRepository";
import { uuid } from 'vue-uuid';

export class BulletRepository implements IBulletRepository {

  public async getBullets(): Promise<IBullet[]> {
    return Promise.resolve([bullet6_5, bullet7_62]);
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
