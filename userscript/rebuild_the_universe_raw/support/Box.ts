import {ArrayBox} from "./ArrayBox.js";
import {AsyncFunctionBox} from "./AsyncFunctionBox.js";
import {ObjectBox_WithPropertyList} from "./BoxWithPropertiesIsBox.js";
import {CSSStyleSheetBox} from "./CSSStyleSheetBox.js";
import {CSSStyleSheetConstructorBox} from "./CSSStyleSheetConstructorBox.js";
import {CSSStyleSheetInitBox} from "./CSSStyleSheetInitBox.js";
import {CSSStyleSheetPromiseBox} from "./CSSStyleSheetPromiseBox.js";
import {DocumentBox} from "./DocumentBox.js";
import {DomElementBox} from "./DomElementBox.js";
import {EmptyArrayBox} from "./EmptyArrayBox.js";
import {FunctionBox} from "./FunctionBox.js";
import {FunctionConstructorBox} from "./FunctionConstructorBox.js";
import {GenericObjectBox} from "./GenericObjectBox.js";
import {GlobalThisBox} from "./GlobalThisBox.js";
import {InstructionTypeArrayBox} from "./InstructionTypeArrayBox.js";
import {InstructionTypeBox} from "./InstructionTypeBox.js";
import {MediaListBox} from "./MediaListBox.js";
import {NewableFunctionBox} from "./NewableFunctionBox.js";
import {NewableInstancePackBox} from "./NewableInstancePackBox.js";
import {NewableInstancePackObjectBox} from "./NewableInstancePackObjectBox.js";
import {NodeBox} from "./NodeBox.js";
import {NumberBox} from "./NumberBox.js";
import {ObjectIndexWithBox} from "./ObjectIndexWithBox.js";
import {ObjectNullBox} from "./ObjectNullBox.js";
import {PromiseBox} from "./PromiseBox.js";
import {RawAnyBox} from "./RawAnyBox.js";
import {RawInterfaceBox} from "./RawInterfaceBox.js";
import {RawUnknownBox} from "./RawUnknownBox.js";
import {RealVoidBox} from "./RealVoidBox.js";
import {StackVMBox} from "./StackVMBox.js";
import {StringBox} from "./StringBox.js";
import {VoidBox} from "./VoidBox.js";
import {VoidPromiseBox} from "./VoidPromiseBox.js";
import {WindowBox} from "./WindowBox.js";

type G_BasicBox=
	|RawInterfaceBox
	|RawUnknownBox
	|RawAnyBox
	|NumberBox
	|StringBox
	;
;
type G_FunctionReturnBox=
	|CSSStyleSheetInitBox
	|EmptyArrayBox
	|ArrayBox
	|InstructionTypeArrayBox
	;
;
type G_ConstructorFunctionBox=
	|CSSStyleSheetConstructorBox
	|FunctionBox
	|NewableFunctionBox
	|NewableInstancePackBox
	|AsyncFunctionBox
	|FunctionConstructorBox
	;
;
type G_PromiseReturnBox=CSSStyleSheetPromiseBox;
type G_GlobalObjBox=
	|GlobalThisBox
	|WindowBox
	|DocumentBox
	;
;
type G_ObjectInstance=
	|StackVMBox
	|NodeBox
	|CSSStyleSheetBox
	|MediaListBox
	;
;
type G_ObjectBox=
	|ObjectNullBox
	|ObjectIndexWithBox
	|GenericObjectBox
	;
;
type G_PromiseBox=
	|VoidPromiseBox
	|PromiseBox
	;
;
type G_VoidBox=
	|VoidBox
	|RealVoidBox
	;
;
type G_GenericBox=|DomElementBox|NewableInstancePackObjectBox;

export type Box=
	|G_BasicBox
	|G_FunctionReturnBox
	|G_ConstructorFunctionBox
	|G_PromiseReturnBox
	|G_GlobalObjBox
	|G_ObjectInstance
	|InstructionTypeBox
	|G_ObjectBox
	|G_PromiseBox
	|G_VoidBox
	|ObjectBox_WithPropertyList
	|G_GenericBox
	|never
	;
;

