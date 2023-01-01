type UrlParse<T extends string>=UrlParseImpl<T> extends never? UrlParseErr<T>:UrlParseImpl<T>;
