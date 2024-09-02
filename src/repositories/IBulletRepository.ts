import { IBullet } from "@/models/IBullet";
import { ICaliber } from "@/models/ICaliber";

export interface IBulletRepository {
  getBullets(): Promise<IBullet[]>;
  getBlankBullet(caliber: ICaliber): IBullet;
}
