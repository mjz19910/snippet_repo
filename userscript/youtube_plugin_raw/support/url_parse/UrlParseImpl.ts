import {UrlParseRes} from "./UrlParseRes";

export type UrlParseImpl<T extends string>=T extends `${infer Protocol extends `${string}:`}//${infer Host}/${infer Pathname}?${infer Search}`? UrlParseRes<T,Host,Protocol,Search,`/${Pathname}`>:never;
