import {ToServiceParams} from "../_/t/ToServiceParams.js";

export type ToServiceParamsList<T>=ToServiceParams<T>[keyof T][];
