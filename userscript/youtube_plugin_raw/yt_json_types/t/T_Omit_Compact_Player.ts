type R_Omit_Compact_Player=Record<"title"|"trackingParams"|"thumbnailOverlays",any>;
type T_Omit_Compact_Player<T extends R_Omit_Compact_Player>=Omit<T,"title"|"trackingParams"|"thumbnailOverlays">;
type T_Omit_Compact_Video<T extends (R_Omit_Compact_Player&Record<"videoId"|"shortViewCountText"|"publishedTimeText",any>)>=Omit<T_Omit_Compact_Player<T>,"videoId"|"shortViewCountText"|"publishedTimeText">;
