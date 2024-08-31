import { bullet6_5, bullet7_62 } from "@/data/bullet";
import { IBullet } from "@/models/IBullet";
import { ICaliber } from "@/models/ICaliber";
import { IBulletService } from "@/services/IBulletService";
import { uuid } from 'vue-uuid';

export class BulletService implements IBulletService {

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
