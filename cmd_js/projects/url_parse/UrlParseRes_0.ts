type UrlParseRes_1<
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
	searchParams: URLSearchParams;
	toJSON(): T;
	username: "";
};
export type UrlParseRes_0<
	T extends string,
	Host extends string,
	Protocol extends string,
	Search extends string,
	Pathname extends string>=UrlParseRes_1<T,Host,Protocol,Search,Pathname>;
