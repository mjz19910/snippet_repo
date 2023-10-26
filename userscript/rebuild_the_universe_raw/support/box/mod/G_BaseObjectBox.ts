import {ObjectBox_WithPropertyList} from "./BoxWithPropertiesIsBox.ts";
import {ObjectBox as ObjectBox} from "./ObjectBox.ts";
import {ObjectBox_WithIndexAsBox as ObjectBox_WithIndexAsBox} from "./ObjectBox_WithIndexAsBox.ts";
import {ObjectBox_Null as ObjectBox_Null} from "./ObjectBox_Null.ts";
export type G_BaseObjectBox=
	|ObjectBox_WithPropertyList
	|ObjectBox_Null
	|ObjectBox_WithIndexAsBox
	|ObjectBox;