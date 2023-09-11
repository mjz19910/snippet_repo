import {UrlParseErr} from "./UrlParseErr.js";
import {UrlParseImpl} from "./UrlParseImpl.js";

export type UrlParse<T extends (`https://${string}`|`http://${string}`)>=UrlParseImpl<T> extends never? UrlParseErr<T>:UrlParseImpl<T>;
