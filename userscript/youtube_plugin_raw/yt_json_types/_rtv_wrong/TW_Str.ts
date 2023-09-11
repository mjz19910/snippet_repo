import {T_VW2} from "../stu/group_T.js";
import {TW_TagStr} from "./TW_TagStr.js";
import {TV_Str,TV_Str_CS} from "./T_Data.js";

export type TW_Str<T extends string>=TV_Str_CS<T>|TW_TagStr<T>|TV_Str<T>|T_VW2<never,T>;
export type TW_Str2<T extends string>=T_VW2<never,T>|TV_Str<T>;
