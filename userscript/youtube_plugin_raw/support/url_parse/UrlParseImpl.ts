type UrlParseImpl<T extends string>=
	T extends `${infer Protocol extends `${string}:`}//${infer Host}/${infer PathName}?${infer Search}`?
	UrlParseRes<T,Host,Protocol,Search,PathName>:
	T extends `${infer Protocol extends `${string}:`}//${infer Host}/${infer PathName}`?
	UrlParseRes_noSearch<T,Host,Protocol,PathName>:never;