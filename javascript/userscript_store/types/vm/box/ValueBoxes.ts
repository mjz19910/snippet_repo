import {ArrayBoxes} from "./ArrayBoxes";
import {BoxesWithValue} from "./BoxesWithValue";
import {InstanceBoxes} from "./InstanceBoxes";
import {ObjectBoxes} from "./ObjectBoxes";
import {VoidBox} from "./VoidBox";

type ValueBoxes = ArrayBoxes | ObjectBoxes | InstanceBoxes | BoxesWithValue | VoidBox;

export default ValueBoxes;
