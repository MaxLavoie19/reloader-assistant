import { IBullet } from "@/models/IBullet";
import { ICaliber } from "@/models/ICaliber";
import { Observable } from "rxjs";

export interface IBulletRepository {
  getBullets(): Observable<IBullet[]>;
  getBlankBullet(caliber: ICaliber): IBullet;
}
