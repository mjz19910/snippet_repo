import {UnwrapKvStore} from "./UnwrapKvStore";
import {KVStore} from "../_/a/KVStore";

export type GetKeyOf<T extends KVStore[]>=UnwrapKvStore<T>[number];
