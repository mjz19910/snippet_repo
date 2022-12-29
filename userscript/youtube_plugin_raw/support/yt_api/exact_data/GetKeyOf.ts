import {UnwrapKvStore} from "./UnwrapKvStore";
import {KVStore} from "../_abc/a/KVStore";

export type GetKeyOf<T extends KVStore[]>=UnwrapKvStore<T>[number];
