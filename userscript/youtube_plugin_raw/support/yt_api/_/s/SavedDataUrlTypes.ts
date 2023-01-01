import {YtPageState} from "../../yt/YtPageState.js";
import {UrlTypes} from "../../../../yt_json_types/UrlTypes.js";

export type SavedDataUrlTypes=`page_type_${YtPageState["pageType"]}`|UrlTypes;
