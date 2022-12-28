import {UnwrapKvStore} from "./UnwrapKvStore";
import {KVStore} from "./KVStore";

export type GetKeyOf<T extends KVStore[]>=UnwrapKvStore<T>[number];
