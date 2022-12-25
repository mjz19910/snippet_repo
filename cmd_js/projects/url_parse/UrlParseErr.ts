export class UrlParseErr<T> {
	readonly _tag = "ERROR";
	readonly parse = "failed to parse url";
	constructor(public err_path: T) {}
}
