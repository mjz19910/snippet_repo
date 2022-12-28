import {PageTypeBrowse} from "../p/PageTypeBrowse.js";
import {PageTypeShorts} from "../p/PageTypeShorts";
import {PageTypeWatch} from "../p/PageTypeWatch";
import {PageTypePlaylist} from "../p/PageTypePlaylist.js";
import {PageTypeSettings} from "../p/PageTypeSettings.js";
import {WebPageTypeChannel} from "../WebPageTypeChannel.js";


export type YTNavigateFinishEventDetail=
	PageTypeWatch|
	PageTypeBrowse|
	PageTypeShorts|
	WebPageTypeChannel|
	PageTypeSettings|
	PageTypePlaylist;
