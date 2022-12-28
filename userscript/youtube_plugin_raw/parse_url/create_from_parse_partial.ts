import {Split} from "../support/make/Split.js";
import {UrlParse_ext} from "./UrlParse_ext";

export function create_from_parse_partial<T extends string>(x: T): UrlParse_ext<T> {
	type St=Split<T,"?">;
	const fs: St=x.split("?") as St;
	return {
		whole_url: x,
		pathname: fs[0],
		search: `?${fs[1]}`,
	} as UrlParse_ext<T>;
}
