import {T_PrimitiveBox} from "../DI_T/DI_T_move.ts";
import {DST_KStr_ABKZ} from "./DST_T_move.ts";

export type DST_UpdateId={
	a: DST_KStr_ABKZ; b: "boxed_id"; k: "update_id";
	key: "boxed_id:update_id";
	z: [T_PrimitiveBox<number>];
};
