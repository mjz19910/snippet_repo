import {PageTypeBrowse} from "../p/PageTypeBrowse.js";
import {PageTypeShorts} from "../p/PageTypeShorts";
import {PageTypeWatch} from "../p/PageTypeWatch";
import {PageTypePlaylist} from "./PageTypePlaylist";
import {WebPageTypeChannel} from "./WebPageTypeChannel";

type PageTypeSettings={
	pageType: "settings";
	endpoint: {};
	response: {
		page: "settings";
		endpoint: {};
		response: {};
		url: string;
	};
	fromHistory: boolean;
	navigationDoneMs: number;
};

export type YTNavigateFinishEventDetail=
	PageTypeWatch|
	PageTypeBrowse|
	PageTypeShorts|
	WebPageTypeChannel|
	PageTypeSettings|
	PageTypePlaylist;
