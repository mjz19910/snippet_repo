import {PageTypeBrowse} from "../p/PageTypeBrowse.js";
import {PageTypeShorts} from "../p/PageTypeShorts";
import {PageTypeWatch} from "../p/PageTypeWatch";
import {PageTypePlaylist} from "./PageTypePlaylist";
import {PageTypeSettings} from "./PageTypeSettings";
import {WebPageTypeChannel} from "./WebPageTypeChannel";

export type YTNavigateFinishEventDetail=
	PageTypeWatch|
	PageTypeBrowse|
	PageTypeShorts|
	WebPageTypeChannel|
	PageTypeSettings|
	PageTypePlaylist;
