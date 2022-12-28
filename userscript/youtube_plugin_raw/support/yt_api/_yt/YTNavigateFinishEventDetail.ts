import {PageTypeBrowse} from "../_abc/p/PageTypeBrowse.js";
import {PageTypeShorts} from "../_abc/p/PageTypeShorts";
import {PageTypeWatch} from "../_abc/p/PageTypeWatch";
import {PageTypePlaylist} from "../_abc/p/PageTypePlaylist.js";
import {PageTypeSettings} from "../_abc/p/PageTypeSettings.js";
import {PageTypeChannel} from "../_abc/PageTypeChannel.js";


export type YTNavigateFinishEventDetail=
	PageTypeWatch|
	PageTypeBrowse|
	PageTypeShorts|
	PageTypeChannel|
	PageTypeSettings|
	PageTypePlaylist;
