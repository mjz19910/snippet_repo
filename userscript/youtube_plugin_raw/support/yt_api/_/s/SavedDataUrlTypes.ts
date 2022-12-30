import {UrlTypesBase} from "../u/UrlTypes.js";
import {YTNavigateFinishEventDetail} from "./youtube_plugin.user.js";

export type SavedDataUrlTypes=`page_type_${YTNavigateFinishEventDetail["pageType"]}`|UrlTypesBase;
