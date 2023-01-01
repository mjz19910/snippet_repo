type UrlParseResFor2<
	T extends string,
	Search extends string,
	Pathname extends string>={
		whole_url: T;
		pathname: Pathname;
		search: `?${Search}`;
	};
