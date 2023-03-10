import {RawAnyBox} from "../RawAnyBox.js";
import {RawInterfaceBox} from "../RawInterfaceBox.js";
import {RawUnknownBox} from "../RawUnknownBox.js";

export type G_RawBox=RawInterfaceBox|
	RawUnknownBox|
	RawAnyBox;
