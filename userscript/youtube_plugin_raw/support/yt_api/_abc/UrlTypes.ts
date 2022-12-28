import {YTNavigateFinishEventDetail} from "../yt/YTNavigateFinishEventDetail.js";
type LiveChatUrlT="live_chat.get_live_chat_replay";
export type UrlTypesBase=
	"att.get"|
	"getDatasyncIdsEndpoint"|
	"guide"|
	"next"|
	"notification.get_notification_menu"|
	"notification.get_unseen_count"|
	"player"|
	"reel_item_watch"|
	"reel_watch_sequence"|
	LiveChatUrlT;
export type UrlTypes=UrlTypesBase|YTNavigateFinishEventDetail['pageType'];
