import {NumberBox} from "./NumberBox.js";
import {RawAnyBox} from "./RawAnyBox.js";
import {RawInterfaceBox} from "./RawInterfaceBox.js";
import {RawUnknownBox} from "./RawUnknownBox.js";
import {StringBox} from "./StringBox.js";

export type G_BasicBox=RawInterfaceBox|
	RawUnknownBox|
	RawAnyBox|
	NumberBox|
	StringBox;
