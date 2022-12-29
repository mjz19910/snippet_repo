import {SavedDataItem} from "./support/yt_api/_/s/SavedDataItem.js";
import {SavedDataUrlTypes} from "./support/yt_api/_/s/SavedDataUrlTypes.js";


export type AnySavedData={
	[U in SavedDataUrlTypes]?: SavedDataItem;
};
