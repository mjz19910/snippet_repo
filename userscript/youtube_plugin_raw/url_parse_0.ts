class ErrType<T> {
	readonly _tag="ERROR";
	readonly parse="failed to parse url";
	constructor(public err_path: T) {}
}
type UrlParseRes<
	T extends string,
	Host extends string,
	Protocol extends string,
	Search extends string,
	Pathname extends string
>={
	hash: "";
	host: Host,
	hostname: Host,
	href: `${Protocol}//${Host}/${Pathname}?${Search}`;
	origin: `${Protocol}//${Host}`,
	password: "";
	path: `/${Pathname}`;
	pathname: `/${Pathname}`;
	port: "";
	protocol: Protocol,
	search: `?${Search}`;
	searchParams: URLSearchParams;
	toJSON(): T;
	username: "";
};
type UrlParse<T extends string>=
	T extends
	`${infer Pt extends `${string}:`
	}//${infer Host
	}/${infer PathName
	}?${infer SearchT
	}`? UrlParseRes<T,Host,Pt,SearchT,PathName>:ErrType<T>;

export function clone_urlparse<T extends string>(v: UrlParse<T>) {
	if('_tag' in v) {
		if(v._tag==="ERROR") throw new Error("Failed");
		throw new Error("Unreachable");
	}
	let {
		hash,
		host,
		hostname,
		href,
		origin,
		password,
		path,
		pathname,
		port,
		protocol,
		search,
		searchParams,
	}=v;
	return {
		hash,
		host,
		hostname,
		href,
		origin,
		password,
		path,
		pathname,
		port,
		protocol,
		search,
		searchParams
	};
}


export function url_parse_0() {
	let pagead=new class {
		adview=new class {
			ai: string|null=null;
		};
	};
	pagead.adview={ai: new URLSearchParams(new URL("https://www.youtube.com/pagead/adview?ai=CR9DJiI6lY62vDMm7n88Pnre6kAngxfL9bfCOlrycEWQQASAAYP2Q9oDMA4IBF2NhLXB1Yi02MjE5ODExNzQ3MDQ5MzcxoAHLt6f4A6gDBMgDCqoEyAFP0EC2FSEYx70zuAUppUfEkYi_mOxY9ayL2TsEqmuwqQ2uR52X5F8mREDx148616YrlzJGcdfwasaotiQufJZQh_1P-F5EUxNcTrvVkGAoIHM-E6HcARQOzmMpiHURkEuWhENDfN2plBxHA5lui-nCj1tpA07TYASPOdBjxm-rT6PJyNg5mzjomgxxcY4JpG3rnZbC1TQ_an4StPQ5YOx-FCxGyY58dQA2TCk1vQwtBzqiGbOgOwWxy0tPKdPvQ51LcGX2i_nxJ8AEyNr865sEiAWjkqTnR5IFCQgTaAF47fX5BqAGboAHncjYB4gHAZAHAqgHgqqxAqgHhAioB6jSG6gHtgeoB-DPG6gH6dQbqAeMzRuoB7HcG6gHpJqxAqgHkZ-xAqgHsJuxAqgH36GxAqgHpqqxAqgHgcYbqAerxRuoB-PZG6gHt6mxAqgH6auxApIIC0FBQUFBQUFBQUFB0ggYCIDAgEAQAhgAMgSBgoAOOgeAgICAgIEEyAkAugs-CAIQBRgWIAgoATADQAFIAFABWCVgAGgAcAGIAQCYAQGiARIKAggBKAH4AQGQAgKoAgXAAgLYAQGAAgGIAgW4E____________wGwFALAFYGAgECKFwoIAxgBKAEwATgBoBcBqReJBEg1yjlletIXDhIK7E7vTqtctFyTaRhu&sigh=f6Ah-ilTPVs&cid=CAESD-D2saJYt_ikQ_sicNcKDQ").search).get("ai")};
	const xx="https://i.ytimg.com/vi/OAIqCpqszVw/hqdefault.jpg?sqp=-oaymwE1CKgBEF5IVfKriqkDKAgBFQAAiEIYAXABwAEG8AEB-AH-CYAC0AWKAgwIABABGB8gZShWMA8=&rs=AOn4CLCpqrflce1_k2te4K_5kNbCpjCm6Q";
	function create_from_parse<T extends string>(str: T): UrlParse<T> {
		return new URL(str) as UrlParse<T>;
	}
	let vv=create_from_parse(xx);
	type rt={
		"hash": "",
		"host": "i.ytimg.com",
		"hostname": "i.ytimg.com",
		"href": "https://i.ytimg.com/vi/OAIqCpqszVw/hqdefault.jpg?sqp=-oaymwE1CKgBEF5IVfKriqkDKAgBFQAAiEIYAXABwAEG8AEB-AH-CYAC0AWKAgwIABABGB8gZShWMA8=&rs=AOn4CLCpqrflce1_k2te4K_5kNbCpjCm6Q",
		"origin": "https://i.ytimg.com",
		"password": "",
		"pathname": "/vi/OAIqCpqszVw/hqdefault.jpg",
		"port": "",
		"protocol": "https:",
		"search": "?sqp=-oaymwE1CKgBEF5IVfKriqkDKAgBFQAAiEIYAXABwAEG8AEB-AH-CYAC0AWKAgwIABABGB8gZShWMA8=&rs=AOn4CLCpqrflce1_k2te4K_5kNbCpjCm6Q",
		"searchParams": URLSearchParams;
	};
	let rt_u: rt=vv;
	rt_u;
	console.log(vv.search);
	type ParseUrlValue<T extends string>=T extends `${infer U}=${infer C}`? {[V in U]: C}:T;
	type ParseUrlItems<T extends string>=T extends `${infer U}&${infer Z}`?
		ParseUrlValue<U>&ParseUrlItems<Z>:T extends `${infer U}`? ParseUrlValue<U>:never;
	type ParseUrlParams<T extends string>=T extends `?${infer V}`? ParseUrlItems<V>:[T];
	type Decay<T>={[U in keyof T]: T[U]}|{};
	type ru=Decay<ParseUrlParams<rt['search']>>;
	function get_url_params<T extends string,K extends Extract<keyof ParseUrlParams<T>,string>>(v: T,k: K): ParseUrlParams<T>[K]|null {
		let res=new URLSearchParams(v).get(k) as ParseUrlParams<T>[K]|null;
		return res;
	}
	let ru_v: ru={};
	ru_v;
	console.log('rs',get_url_params(vv.search,"rs"));
}

url_parse_0();
