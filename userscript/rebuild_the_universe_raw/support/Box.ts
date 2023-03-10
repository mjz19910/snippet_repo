import {G_BasicBox} from "./G_BasicBox.js";
import {G_ObjectBox,ObjectBoxesExcludeImpl} from "./G_ObjectBox.js";
import {G_VoidBox} from "./G_VoidBox.js";

export type Box=
	|G_BasicBox
	|G_ObjectBox
	|G_VoidBox
	;
;
export type NonObjectBoxes=Exclude<ObjectBoxesExcludeImpl<Box>,G_BasicBox|G_VoidBox>;

function test_value(): never {
	function is_never(): NonObjectBoxes {throw new Error();}
	return is_never();
}

export const box_value_test=test_value;
