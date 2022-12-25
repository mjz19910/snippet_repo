export type UrlParseRes_0<
	T extends string,
	Host extends string,
	Protocol extends string,
	Search extends string,
	Pathname extends string> = {
		hash: "";
		host: Host;
		hostname: Host;
		href: `${Protocol}//${Host}${Pathname}?${Search}`;
		origin: `${Protocol}//${Host}`;
		password: "";
		path: Pathname;
		pathname: Pathname;
		port: "";
		protocol: Protocol;
		search: `?${Search}`;
		searchParams: URLSearchParams;
		toJSON(): T;
		username: "";
	};
