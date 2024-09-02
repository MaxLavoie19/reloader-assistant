import { IBulletAutocompleteMapper } from "@/mappers/IBulletAutocompleteMapper";
import { IAutocompleteItem } from "@/models/IAutocompleteItem";
import { IBullet } from "@/models/IBullet";

export class BulletAutocompleteMapper implements IBulletAutocompleteMapper {
  public map(option: IBullet): IAutocompleteItem<IBullet> {
    return {
      title: `${option.manufacturer.name} ${option.caliber.name} ${option.weightInGrains}gr`,
      value: option,
    };
  }
}
