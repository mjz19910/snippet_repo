import {ObjectBox_WithPropertyList} from "./BoxWithPropertiesIsBox.js";
import {G_ConstructorFunctionBox} from "./G_ConstructorFunctionBox.js";
import {G_FunctionReturnBox} from "./G_FunctionReturnBox.js";
import {G_GenericBox} from "./G_GenericBox.js";
import {G_GlobalObjBox} from "./G_GlobalObjBox.js";
import {G_ObjectInstance} from "./G_ObjectInstance.js";
import {G_PromiseBox} from "./G_PromiseBox.js";
import {G_PromiseReturnBox} from "./G_PromiseReturnBox.js";
import {G_StackVMSupportBox} from "./G_StackVMSupportBox.js";
import {GenericObjectBox as ObjectBox} from "./GenericObjectBox.js";
import {ObjectIndexWithBox as ObjectBox_WithIndexAsBox} from "./ObjectIndexWithBox.js";
import {ObjectNullBox as ObjectBox_Null} from "./ObjectNullBox.js";

export type G_ObjectBox=
	|ObjectBox_Null
	|ObjectBox_WithIndexAsBox
	|ObjectBox
	|ObjectBox_WithPropertyList
	|G_ConstructorFunctionBox
	|G_FunctionReturnBox
	|G_PromiseReturnBox
	|G_GlobalObjBox
	|G_ObjectInstance
	|G_StackVMSupportBox
	|G_PromiseBox
	|G_GenericBox
	;
;
