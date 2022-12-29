import {RadioPlaylistStr} from "./RadioPlaylistStr.js";

export type WatchWebCommandMetadata={
  url: `/watch?${string}`|`/watch?v=${string}&list=${RadioPlaylistStr<string>}&start_radio=1`;
  webPageType: "WEB_PAGE_TYPE_WATCH";
  rootVe: 3832;
};
