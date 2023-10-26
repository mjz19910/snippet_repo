import {P_param} from "../yt_json_types/abc/group_C.ts";

export type wp_param_ex=Extract<P_param,`watch.params.${string}`>;
