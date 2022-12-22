import {SavedInstanceObject} from "./SavedInstanceObject";
import {SavedInstanceMetaType} from "./SavedInstanceMetaType";

export type SavedInstanceSubType=[SavedInstanceMetaType,SavedInstanceObject];
declare global {
	type SavedInstanceSubType=[SavedInstanceMetaType,SavedInstanceObject];
}
