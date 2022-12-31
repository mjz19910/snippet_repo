import {SavedDataItem} from "../s/SavedDataItem.js";
import {SavedDataUrlTypes} from "../s/SavedDataUrlTypes.js";

export type AnySavedData={
	[U in SavedDataUrlTypes]?: SavedDataItem;
};
