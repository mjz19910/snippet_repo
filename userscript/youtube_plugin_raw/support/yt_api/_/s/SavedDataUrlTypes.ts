import {YtPageState} from "../../yt/YtPageState.js";
import {UrlTypes} from "../u/UrlTypes.js";

export type SavedDataUrlTypes=`page_type_${YtPageState["pageType"]}`|UrlTypes;
