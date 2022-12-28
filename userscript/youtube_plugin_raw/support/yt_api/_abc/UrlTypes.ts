import {YTNavigateFinishEventDetail} from "../yt/YTNavigateFinishEventDetail.js";

export type UrlTypesBase="getDatasyncIdsEndpoint"|"att.get"|"notification.get_unseen_count"|"notification.get_notification_menu"|"guide"|"reel_item_watch"|"reel_watch_sequence"|"player"|"next";
export type UrlTypes=UrlTypesBase|YTNavigateFinishEventDetail['pageType'];
