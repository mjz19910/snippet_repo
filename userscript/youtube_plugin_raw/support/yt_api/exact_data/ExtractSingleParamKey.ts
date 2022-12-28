import {ExtractParamKey} from "./ExtractParamKey";
import {KVStore} from "./KVStore";


export type ExtractSingleParamKey<U extends KVStore,T extends string>=ExtractParamKey<[U],T>;
