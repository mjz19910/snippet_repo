import {PageTypeBrowse} from "./PageTypeBrowse.js";
import {PageTypeShorts} from "./PageTypeShorts";
import {PageTypeWatch} from "./PageTypeWatch.1";

export type YTNavigateFinishEventDetail<T>=PageTypeWatch<T>|PageTypeBrowse|PageTypeShorts<T>;
