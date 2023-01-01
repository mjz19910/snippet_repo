type UrlParseImpl<T extends string>=T extends `${infer Protocol extends `${string}:`}//${infer Host}/${infer PathName}?${infer Search}`? UrlParseRes<T,Host,Protocol,Search,PathName>:never;
