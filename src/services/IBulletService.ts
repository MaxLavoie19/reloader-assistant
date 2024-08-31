import { IBullet } from "@/models/IBullet";
import { ICaliber } from "@/models/ICaliber";

export interface IBulletService {
  getBullets(): Promise<IBullet[]>;
  getBlankBullet(caliber: ICaliber): IBullet;
}
