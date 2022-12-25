import {UrlParse} from "./UrlParse";

export function create_from_parse<T extends string>(str: T): UrlParse<T> {
	return new URL(str) as UrlParse<T>;
}
