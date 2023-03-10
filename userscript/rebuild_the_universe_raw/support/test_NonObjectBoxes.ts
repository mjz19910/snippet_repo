import {Box} from "./Box.js";
import {G_BasicBox} from "./G_BasicBox.js";
import {ObjectBoxesExcludeImpl} from "./G_ObjectBox.js";

export type NonObjectBoxes=Exclude<ObjectBoxesExcludeImpl<Box>,G_BasicBox>;

function test_value(): never {
	function is_never(): NonObjectBoxes {throw new Error();}
	return is_never();
}

export const box_value_test=test_value;
