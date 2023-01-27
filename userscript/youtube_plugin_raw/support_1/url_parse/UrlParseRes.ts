type UrlParseRes<
	T extends string,
	Host extends string,
	Protocol extends string,
	Search extends string,
	PathName extends string>=UrlParseResImpl<T,Host,Protocol,Search,PathName>;
