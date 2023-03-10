import {G_ArrayBox} from "./G_ArrayBox.js";
import {G_FunctionBox} from "./G_FunctionBox.js";
import {G_FunctionReturnBox} from "./G_FunctionReturnBox.js";
import {G_GenericBox} from "./G_GenericBox.js";
import {G_GlobalObjBox} from "./G_GlobalObjBox.js";
import {G_ObjectInstanceBox} from "./G_ObjectInstanceBox.js";
import {G_PromiseBox} from "./G_PromiseBox.js";
import {G_PromiseReturnBox} from "./G_PromiseReturnBox.js";
import {G_StackVMSupportBox} from "../../G_StackVMSupportBox.js";
import {G_BaseObjectBox} from "./G_BaseObjectBox.js";

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
