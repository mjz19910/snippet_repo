import {yt_response_browse} from "./yt_response_browse";
import {yt_response_guide} from "./yt_response_guide";
import {yt_notification_get_unseen_count} from "./yt_notification_get_unseen_count";
import {notification_get_notification_menu} from "./notification_get_notification_menu";
import {yt_response_next} from "./yt_response_next";
import {yt_response_att_get} from "./yt_response_att_get";
import {yt_response_getDatasyncIdsEndpoint} from "./yt_response_getDatasyncIdsEndpoint";
import {yt_response_reel_item_watch} from "./yt_response_reel_item_watch";
import {yt_response_player} from "./yt_response_player";
import {yt_response_reel_watch_sequence} from "./yt_response_reel_watch_sequence";

export type responseTypes=
	yt_response_getDatasyncIdsEndpoint|
	yt_response_att_get|
	yt_response_next|
	notification_get_notification_menu|
	yt_notification_get_unseen_count|
	yt_response_guide|
	yt_response_browse|
	yt_response_player|
	yt_response_reel_item_watch|
	yt_response_reel_watch_sequence;
