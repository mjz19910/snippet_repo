import {FirstArr} from "./FirstArr";
import {RemoveFirst} from "./RemoveFirst";

export type ReverseArr<U extends any[]> = U extends [] ? [] : [...ReverseArr<RemoveFirst<U>>, FirstArr<U>];
