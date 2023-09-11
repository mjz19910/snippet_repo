import {T_PArr_1,T_Param_Child} from "../stu/group_T.js";

export type TW_TagStr<T extends string>=T_PArr_1<[T_Param_Child<{},["string",T]>]>;
