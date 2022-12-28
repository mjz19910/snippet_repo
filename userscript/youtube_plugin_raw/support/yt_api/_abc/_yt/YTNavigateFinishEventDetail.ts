import {PageTypeBrowse} from "../p/PageTypeBrowse.js";
import {PageTypeShorts} from "../p/PageTypeShorts";
import {PageTypeWatch} from "../p/PageTypeWatch";
import {PageTypePlaylist} from "./PageTypePlaylist";

export type YTNavigateFinishEventDetail<T extends string>=PageTypeWatch<T>|PageTypeBrowse<T>|PageTypeShorts<T>|PageTypePlaylist<T>;
