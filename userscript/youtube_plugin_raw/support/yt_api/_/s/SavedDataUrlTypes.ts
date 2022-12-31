import {YTNavigateFinishEventDetail} from "../../yt/YTNavigateFinishEventDetail.js";
import {UrlTypes} from "../u/UrlTypes.js";

export type SavedDataUrlTypes=`page_type_${YTNavigateFinishEventDetail["pageType"]}`|UrlTypes;
