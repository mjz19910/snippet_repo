// deno-lint-ignore-file
import {Join} from "../support_1/Join.ts";
import {T_Split} from "../yt_json_types/stu/group_T.ts";

export type EnumToNiceName<T extends string,U extends unknown[]=T_Split<Lowercase<T>,"_">>=Join<{[A in keyof U]: Capitalize<U[A]>;},"">;
