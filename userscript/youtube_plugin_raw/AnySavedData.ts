import {UrlTypesBase} from "./UrlTypes.js";
import {YTNavigateFinishEventDetail} from "./youtube_plugin.user.js";
export type UrlTypes2=`page_type_${YTNavigateFinishEventDetail['pageType']}`|UrlTypesBase;
export type AnySavedData={[U in UrlTypes2]?: {}};
