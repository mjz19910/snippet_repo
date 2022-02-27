import {ArrayBoxes} from "./box/ArrayBoxes";
import {BoxesWithValue} from "./box/BoxesWithValue";
import {InstanceBoxes} from "./InstanceBoxes";
import {ObjectBoxes as ObjectBoxes} from "./ObjectBoxes";
import {VoidBox} from "./VoidBox";

// --- VM Value (types) ---


type ValueBoxes = ArrayBoxes | ObjectBoxes | InstanceBoxes | BoxesWithValue | VoidBox;
export default ValueBoxes;
