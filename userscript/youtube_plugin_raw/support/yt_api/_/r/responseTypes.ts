import {notification_get_notification_menu} from "../../../_/notification_get_notification_menu.js";
import {yt_notification_get_unseen_count as notification_get_unseen_count} from "../../yt/yt_notification_get_unseen_count.js";
import {yt_response_att_get as att_get} from "../../yt/yt_response_att_get.js";
import {browse_t as browse_t} from "../../yt/browse_t.js";
import {yt_response_getDatasyncIdsEndpoint as getDatasyncIdsEndpoint_t} from "../../yt/yt_response_getDatasyncIdsEndpoint.js";
import {yt_response_guide as guide_t} from "../../yt/yt_response_guide.js";
import {yt_response_live_chat_get_live_chat_replay as live_chat_get_live_chat_replay_t} from "../../yt/yt_response_live_chat_get_live_chat_replay.js";
import {yt_response_next as next_t} from "../../yt/yt_response_next.js";
import {yt_response_player as player_t} from "../../yt/yt_response_player.js";
import {yt_response_reel_item_watch as reel_reel_item_watch} from "../../yt/yt_response_reel_item_watch.js";
import {yt_response_reel_watch_sequence as reel_reel_watch_sequence} from "../../yt/yt_response_reel_watch_sequence.js";
import {account_account_menu_t} from "./account_account_menu_t";
import {notification_record_interactions} from "./notification_record_interactions";
import {feedback_t} from "./feedback_t";
import {get_transcript_t} from "./get_transcript_t";

export type responseTypes=
	account_account_menu_t|
	att_get|
	browse_t|
	feedback_t|
	get_transcript_t|
	getDatasyncIdsEndpoint_t|
	guide_t|
	live_chat_get_live_chat_replay_t|
	next_t|
	notification_get_notification_menu|
	notification_get_unseen_count|
	notification_record_interactions|
	player_t|
	reel_reel_item_watch|
	reel_reel_watch_sequence|
	never;
