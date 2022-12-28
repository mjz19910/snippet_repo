import {SavedDataItem} from "./SavedDataItem";
import {SavedDataUrlTypes} from "./SavedDataUrlTypes";

export type AnySavedData={
	[U in SavedDataUrlTypes]?: SavedDataItem
};
