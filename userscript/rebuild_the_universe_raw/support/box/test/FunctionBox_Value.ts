import {Box} from "../mod/Box.ts";
import {NewableInstancePack} from "../interface/NewableInstancePack.ts";
import {FunctionLike} from "../../../../DebugApi_raw/support/types/FunctionLike.ts";

export type FunctionBox_Value=
	((...a: Box[]) => Box)|
	((...a: Box[]) => Promise<Box>)|
	NewableInstancePack<Record<never,never>>|
	FunctionConstructor|
	FunctionLike;
      