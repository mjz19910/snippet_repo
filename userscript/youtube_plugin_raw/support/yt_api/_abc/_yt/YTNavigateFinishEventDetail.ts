import {PageTypeBrowse} from "../p/PageTypeBrowse.js";
import {PageTypeShorts} from "../p/PageTypeShorts";
import {PageTypeWatch} from "../p/PageTypeWatch";

export type YTNavigateFinishEventDetail<T>=PageTypeWatch<T>|PageTypeBrowse|PageTypeShorts<T>;
