import {AsyncFunctionBox} from "./AsyncFunctionBox.js";
import {NumberBox} from "./NumberBox.js";
import {ObjectBox} from "./ObjectBox.js";
import {VoidBox} from "./VoidBox.js";
import {WindowBox} from "./WindowBox.js";

export type Box=
	NumberBox|
	WindowBox|
	ObjectBox|
	VoidBox|
	AsyncFunctionBox|
	never;
