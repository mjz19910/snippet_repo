import {G_ArrayBox} from "./G_ArrayBox.ts";
import {G_FunctionBox} from "./G_FunctionBox.ts";
import {G_FunctionReturnBox} from "./G_FunctionReturnBox.ts";
import {G_GenericBox} from "./G_GenericBox.ts";
import {G_GlobalObjBox} from "./G_GlobalObjBox.ts";
import {G_ObjectInstanceBox} from "./G_ObjectInstanceBox.ts";
import {G_PromiseBox} from "./G_PromiseBox.ts";
import {G_PromiseReturnBox} from "./G_PromiseReturnBox.ts";
import {G_StackVMSupportBox} from "../../G_StackVMSupportBox.ts";
import {G_BaseObjectBox} from "./G_BaseObjectBox.ts";

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
