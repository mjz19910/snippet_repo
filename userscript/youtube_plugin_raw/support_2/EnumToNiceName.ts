import {Join} from "../support_1/Join.js";
import {T_Split} from "../yt_json_types/stu/group_T.js";

export type EnumToNiceName<T extends string,U extends any[]=T_Split<Lowercase<T>,"_">>=Join<{[A in keyof U]: Capitalize<U[A]>;},"">;
