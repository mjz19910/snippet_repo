import {DI_A_VideoTime} from "../../group_D.js";
import {DST_KStr_ABKZ} from "./DST_T_move.js";

export type DST_VideoTime={
	a: DST_KStr_ABKZ; b: "boxed_id"; l: "video_time";
	key: `boxed_id:video_time:${number}s`;
	z: [DI_A_VideoTime];
};
