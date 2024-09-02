import { IAutocompleteMapper } from "@/mappers/IAutocompleteMapper";
import { IAutocompleteItem } from "@/models/IAutocompleteItem";
import { IBullet } from "@/models/IBullet";

export interface IBulletAutocompleteMapper extends IAutocompleteMapper<IBullet> {
  map(option: IBullet): IAutocompleteItem<IBullet>;
}
