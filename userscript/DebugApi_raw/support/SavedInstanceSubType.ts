import {SavedInstanceObject} from "./SavedInstanceObject";
import {SavedInstanceMetaType} from "./SavedInstanceMetaType";

declare global {
	type SavedInstanceSubType=[SavedInstanceMetaType,SavedInstanceObject];
}

export {type SavedInstanceSubType};
