import {KVStore} from "../_/k/KVStore.js";
import {ExtractParamKey} from "./ExtractParamKey";


export type ExtractSingleParamKey<U extends KVStore,T extends string>=ExtractParamKey<[U],T>;
