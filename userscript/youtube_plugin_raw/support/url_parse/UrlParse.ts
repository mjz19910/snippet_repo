import {UrlParseErr} from "./UrlParseErr";
import {UrlParseRes_0} from "./UrlParseRes_0";

export type UrlParse<T extends string>=T extends `${infer Protocol extends `${string}:`}//${infer Host}/${infer Pathname}?${infer Search}`? UrlParseRes_0<T,Host,Protocol,Search,`/${Pathname}`>:UrlParseErr<T>;
