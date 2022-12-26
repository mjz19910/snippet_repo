import {ParseParamItem} from "./ParseParamItem";

export type ParseUrlSearchParams<T extends string>=T extends `?${infer V}`? ParseParamItem<V>:never;
