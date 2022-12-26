import {UrlParseImpl} from "./UrlParseImpl";
import {UrlParseErr} from "./UrlParseErr";

export type UrlParse<T extends string>=UrlParseImpl<T> extends never? UrlParseErr<T>:UrlParseImpl<T>;
