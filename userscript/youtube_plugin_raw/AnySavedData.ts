import {UrlTypesBase} from "./UrlTypes.js";
import {YTNavigateFinishEventDetail} from "./youtube_plugin.user.js";
export type UrlTypes2=`page_type_${YTNavigateFinishEventDetail['pageType']}`|UrlTypesBase;
type SavedDataItem={
	[str: string]: {};
};

export type AnySavedData={
	[U in UrlTypes2]?: SavedDataItem
};
