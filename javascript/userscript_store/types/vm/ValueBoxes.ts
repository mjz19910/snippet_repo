import {BoxesWithoutValue} from "./BoxesWithoutValue";
import {BoxesWithValue} from "./BoxesWithValue";

// --- VM Value (types) ---


type ValueBoxes = BoxesWithValue | BoxesWithoutValue;
export default ValueBoxes;
