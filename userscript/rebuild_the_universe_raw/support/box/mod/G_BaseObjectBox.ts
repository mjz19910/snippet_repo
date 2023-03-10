import {ObjectBox_WithPropertyList} from "./BoxWithPropertiesIsBox.js";
import {GenericObjectBox as ObjectBox} from "./GenericObjectBox.js";
import {ObjectIndexWithBox as ObjectBox_WithIndexAsBox} from "./ObjectIndexWithBox.js";
import {ObjectNullBox as ObjectBox_Null} from "./ObjectNullBox.js";

export type G_BaseObjectBox=
	|ObjectBox_WithPropertyList
	|ObjectBox_Null
	|ObjectBox_WithIndexAsBox
	|ObjectBox
	;
;
