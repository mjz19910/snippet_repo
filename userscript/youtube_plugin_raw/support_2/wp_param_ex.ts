import {P_param} from "../yt_json_types/abc/group_C.js";

export type wp_param_ex=Extract<P_param,`watch.params.${string}`>;
