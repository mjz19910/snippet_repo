export type UrlParseRes_noSearch<
	T extends string,
	Host extends string,
	Protocol extends string,
	PathName extends string>={
		hash: "";
		host: `${Host}`;
		hostname: `${Host}`;
		href: `${Protocol}//${Host}/${PathName}`;
		origin: `${Protocol}//${Host}`;
		password: "";
		pathname: `/${PathName}`;
		port: "";
		protocol: `${Protocol}`;
		search: "";
    searchParams: URLSearchParams;
		toJSON(): T;
		username: "";
	};