import {IBox} from "./mod";
import {TGetOr} from "./TGetOr";

type BoxTypeKeys = TGetOr<IBox, 'type'>;
