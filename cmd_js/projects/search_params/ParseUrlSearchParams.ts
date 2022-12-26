import {ParseUrlItems} from "./ParseUrlItems.js";

export type ParseUrlSearchParams<T extends string>=T extends `?${infer V}`? ParseUrlItems<V>:never;
