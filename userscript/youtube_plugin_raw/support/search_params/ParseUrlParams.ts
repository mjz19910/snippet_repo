import {ParseUrlItems} from "./ParseUrlItems";

export type ParseUrlParams<T extends string>=T extends `?${infer V}`? ParseUrlItems<V>:[T];
