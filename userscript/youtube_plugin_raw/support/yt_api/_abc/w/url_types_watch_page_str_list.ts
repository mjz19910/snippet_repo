import {RadioPlaylistStr} from "./RadioPlaylistStr";
import {YtVideoIdStr} from "../../yt/YtVideoIdStr";

export type url_types_watch_page_str_list=[
  <T extends string extends infer C? YtVideoIdStr<C>:never>() => `/watch?v=${T}&list=${RadioPlaylistStr<T>}&start_radio=${number}`,
  `/watch?v=${string}`
];
