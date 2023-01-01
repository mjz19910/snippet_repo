import {ToServiceParams} from "./ToServiceParams.js";

export type ToServiceParamsList<T>=ToServiceParams<T>[keyof T][];
