import {FirstStr} from "./FirstStr";
import {RemoveFirstStr} from "./RemoveFirstStr";

export type ReverseStr<U extends string> = U extends '' ? '' : `${ReverseStr<RemoveFirstStr<U>>}${FirstStr<U>}`;
