import {UrlParse} from "./UrlParse";
import {UrlParseErr} from "./UrlParseErr";

export type UrlParseOpt<T extends string>=UrlParse<T> extends never? UrlParseErr<T>:UrlParse<T>;
