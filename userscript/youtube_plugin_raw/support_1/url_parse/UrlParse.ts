export type UrlParse<T extends (`https://${string}`|`http://${string}`)>=
UrlParseImpl<T> extends never? UrlParseErr<T>:UrlParseImpl<T>;
