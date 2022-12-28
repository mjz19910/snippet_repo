import {notification_get_notification_menu} from "./notification_get_notification_menu.js";
import {yt_notification_get_unseen_count} from "./yt/yt_notification_get_unseen_count.js";
import {yt_response_att_get} from "./yt/yt_response_att_get.js";
import {yt_response_browse} from "./yt/yt_response_browse.js";
import {yt_response_getDatasyncIdsEndpoint} from "./yt/yt_response_getDatasyncIdsEndpoint.js";
import {yt_response_guide} from "./yt/yt_response_guide.js";
import {yt_response_next} from "./yt/yt_response_next.js";
import {yt_response_player} from "./yt/yt_response_player.js";
import {yt_response_reel_item_watch} from "./yt/yt_response_reel_item_watch.js";
import {yt_response_reel_watch_sequence} from "./yt/yt_response_reel_watch_sequence.js";

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
