import {IBox} from "./mod";
import {TGetOr} from "./TGetOr";
export type UnboxedObjects = TGetOr<IBox, 'value'>;
