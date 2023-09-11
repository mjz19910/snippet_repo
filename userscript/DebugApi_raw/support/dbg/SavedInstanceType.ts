import {SavedArrayItemType} from "./SavedArrayItemType.js";
import {SavedInstanceSubType} from "./SavedInstanceSubType";

declare global {type SavedInstanceType=SavedArrayItemType<SavedInstanceSubType>;}

export {type SavedInstanceType};
