import {AnySavedData} from "./AnySavedData.js";

export type SavedData={
	any_data?: AnySavedData;
	ad_layout_data?: AdLayoutData;
	data?: {[x: string]: ({}[])|undefined}
};
