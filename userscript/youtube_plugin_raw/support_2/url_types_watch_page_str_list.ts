import {T_VideoIdStr} from "../yt_json_types/stu/group_T.ts";

export type url_types_watch_page_str_list=[
  <T extends string extends infer C? T_VideoIdStr<C>:never>() => `/watch?v=${T}&list=RD${T}&start_radio=${number}`,
  `/watch?v=${string}`
];
