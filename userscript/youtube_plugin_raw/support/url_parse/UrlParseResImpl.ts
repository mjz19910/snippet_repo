export type UrlParseResImpl<
	T extends string,
	Host extends string,
	Protocol extends string,
	Search extends string,
	PathName extends string>={
		hash: "";
		host: `${Host}`;
		hostname: `${Host}`;
		href: `${Protocol}://${Host}/${PathName}?${Search}`;
		origin: `${Protocol}//${Host}`;
		password: "";
		pathname: `/${PathName}`;
		port: "";
		protocol: `${Protocol}`;
		search: `?${Search}`;
    /*grep-skip*/ searchParams: URLSearchParams;
		toJSON(): T;
		username: "";
	};
