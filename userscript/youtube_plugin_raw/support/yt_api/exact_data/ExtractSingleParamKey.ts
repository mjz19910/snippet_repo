import {ExtractParamKey} from "./ExtractParamKey";
import {KVStore} from "../_/a/KVStore";


export type ExtractSingleParamKey<U extends KVStore,T extends string>=ExtractParamKey<[U],T>;
