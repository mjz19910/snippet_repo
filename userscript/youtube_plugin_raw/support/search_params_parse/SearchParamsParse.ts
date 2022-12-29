import {ParseParamItem} from "./ParseParamItem";

export type ParseUrlSearchParams<T extends string>=T extends `?${infer V}`? ParseParamItem<V>:T extends `${infer X}`?ParseParamItem<X>:never;
