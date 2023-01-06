import {SavedDataUrlTypes} from "./SavedDataUrlTypes.js";

export type AnySavedData={
	[U in SavedDataUrlTypes]?: SavedDataItem;
};
