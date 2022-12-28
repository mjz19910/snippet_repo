import {PageTypeBrowse} from "../p/PageTypeBrowse.js";
import {PageTypeShorts} from "../p/PageTypeShorts";
import {PageTypeWatch} from "../p/PageTypeWatch";
import {PageTypePlaylist} from "./PageTypePlaylist";
import {WebPageTypeChannel} from "./WebPageTypeChannel";

export type YTNavigateFinishEventDetail=
	PageTypeWatch|
	PageTypeBrowse|
	PageTypeShorts|
	WebPageTypeChannel|
	PageTypePlaylist;
