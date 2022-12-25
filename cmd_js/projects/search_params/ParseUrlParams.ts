import {ParseUrlItems} from "./ParseUrlItems.js";

export type ParseUrlParams<T extends string>=T extends `?${infer V}`? ParseUrlItems<V>:[T];
