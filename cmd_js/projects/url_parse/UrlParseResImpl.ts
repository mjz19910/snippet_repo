export type UrlParseResImpl<
	T extends string,
	Host extends string,
	Protocol extends string,
	Search extends string,
	Pathname extends string>={
		hash: "";
		host: Host;
		hostname: Host;
		href: `${Protocol}//${Host}${Pathname}?${Search}`;
		origin: `${Protocol}//${Host}`;
		password: "";
		pathname: Pathname;
		port: "";
		protocol: Protocol;
		search: `?${Search}`;
    /*grep-skip*/ searchParams: URLSearchParams;
		toJSON(): T;
		username: "";
	};
