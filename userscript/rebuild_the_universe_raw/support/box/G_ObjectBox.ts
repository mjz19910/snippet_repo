import {Box} from "./z_done/Box.js";
import {ObjectBox_WithPropertyList} from "./z_done/BoxWithPropertiesIsBox.js";
import {G_ArrayBox} from "./zz_broken/G_ArrayBox.js";
import {G_FunctionBox} from "./z_done/G_FunctionBox.js";
import {G_FunctionReturnBox} from "./z_done/G_FunctionReturnBox.js";
import {G_GenericBox} from "./zz_broken/G_GenericBox.js";
import {G_GlobalObjBox} from "./G_GlobalObjBox.js";
import {G_ObjectInstanceBox} from "./G_ObjectInstanceBox.js";
import {G_PromiseBox} from "./G_PromiseBox.js";
import {G_PromiseReturnBox} from "./G_PromiseReturnBox.js";
import {G_StackVMSupportBox} from "../G_StackVMSupportBox.js";
import {GenericObjectBox as ObjectBox} from "./GenericObjectBox.js";
import {NumberBox} from "./NumberBox.js";
import {ObjectIndexWithBox as ObjectBox_WithIndexAsBox} from "./ObjectIndexWithBox.js";
import {ObjectNullBox as ObjectBox_Null} from "./ObjectNullBox.js";
import {StringBox} from "./StringBox.js";

type G_BaseObjectBox=
	|ObjectBox_WithPropertyList
	|ObjectBox_Null
	|ObjectBox_WithIndexAsBox
	|ObjectBox
	;
;
export type G_ObjectBox=
	|G_BaseObjectBox
	|G_FunctionBox
	|G_FunctionReturnBox
	|G_ArrayBox
	|G_PromiseReturnBox
	|G_GlobalObjBox
	|G_ObjectInstanceBox
	|G_StackVMSupportBox
	|G_PromiseBox
	|G_GenericBox
	;
;
export type ObjectBoxesExtractImpl<T extends Box>=T extends infer I? Extract<I,{value: {}|null;}>:never;
export type ObjectBoxesExcludeImpl<T extends Box>=T extends infer I? Exclude<I,{value: {}|null;}>:never;
export type ObjectBoxesExcludeImpl2<T extends Box,V_Exclude>=T extends infer I? Exclude<I,{value: V_Exclude;}>:never;
export type ObjectBoxesExtractImpl2<T extends Box,V_Extract>=T extends infer I? Extract<I,{value: V_Extract;}>:never;

export type ExcludeObjectBoxPrimitives<T extends Box>=Exclude<T,StringBox|NumberBox>;

export type ObjectBoxes=ExcludeObjectBoxPrimitives<ObjectBoxesExcludeImpl2<ObjectBoxesExtractImpl<Box>,object|null>>;
