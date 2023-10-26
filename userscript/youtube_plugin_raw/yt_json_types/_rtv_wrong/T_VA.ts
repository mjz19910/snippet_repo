import {T_PArr_R,T_Param_Child} from "../stu/group_T.ts";

export type T_VA<T>=T_PArr_R<T_Param_Child<T,["string",string]>[]>;
