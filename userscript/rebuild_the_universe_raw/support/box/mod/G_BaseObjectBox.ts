import {ObjectBox_WithPropertyList} from "./BoxWithPropertiesIsBox.ts";
import {GenericObjectBox as ObjectBox} from "./GenericObjectBox.ts";
import {ObjectIndexWithBox as ObjectBox_WithIndexAsBox} from "./ObjectIndexWithBox.ts";
import {ObjectBox_Null as ObjectBox_Null} from "./ObjectBox_Null.ts";
export type G_BaseObjectBox=
	|ObjectBox_WithPropertyList
	|ObjectBox_Null
	|ObjectBox_WithIndexAsBox
	|ObjectBox;