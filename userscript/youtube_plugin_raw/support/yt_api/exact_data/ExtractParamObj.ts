import {ExtractSingleParamKey} from "./ExtractSingleParamKey.js";

export type ExtractParamObj<T extends number,U extends any[]>=ExtractSingleParamKey<U[T],U[T]['key']>;
