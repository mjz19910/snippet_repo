import {PageTypeBrowse} from "../_/p/PageTypeBrowse.js";
import {PageTypeChannel} from "../_/p/PageTypeChannel.js";
import {PageTypePlaylist} from "../_/p/PageTypePlaylist.js";
import {PageTypeSettings} from "../_/p/PageTypeSettings";
import {PageTypeShorts} from "../_/p/PageTypeShorts.js";
import {PageTypeWatch} from "../_/p/PageTypeWatch.js";

export type YTNavigateFinishEventDetail=
	PageTypeWatch|
	PageTypeBrowse|
	PageTypeShorts|
	PageTypeChannel|
	PageTypeSettings|
	PageTypePlaylist;
