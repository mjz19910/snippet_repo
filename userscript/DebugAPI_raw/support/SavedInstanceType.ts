import {SavedInstanceSubType} from "./SavedInstanceSubType";

export type SavedInstanceType=SavedArrayItemType<SavedInstanceSubType>;

declare global {
	type SavedInstanceType=SavedArrayItemType<SavedInstanceSubType>;
}
