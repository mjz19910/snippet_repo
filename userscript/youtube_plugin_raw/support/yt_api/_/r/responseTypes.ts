import {GetNotificationMenuBox} from "../GetNotificationMenuBox";
import {att_get_t} from "../../yt/att_get_t.js";
import {getDatasyncIdsEndpoint_t} from "../../yt/getDatasyncIdsEndpoint_t";
import {guide_t} from "../../yt/guide_t.js";
import {live_chat_get_live_chat_replay_t} from "../../yt/live_chat_get_live_chat_replay_t";
import {next_t} from "../../yt/next_t.js";
import {notification_get_unseen_count_t} from "../../yt/notification_get_unseen_count_t.js";
import {player_t} from "../../yt/player_t.js";
import {reel_reel_item_watch_t} from "../../yt/reel_reel_item_watch_t.js";
import {reel_reel_watch_sequence_t} from "../../yt/reel_reel_watch_sequence_t.js";
import {browse_t} from "../b/browse_t.js";
import {feedback_t} from "../f/feedback_t";
import {get_transcript_t} from "../g/get_transcript_t";
import {notification_record_interactions} from "../n/notification_record_interactions";
import {account_account_menu_t} from "./account_account_menu_t";

export type ResponseTypes=
	account_account_menu_t|
	att_get_t|
	browse_t|
	feedback_t|
	get_transcript_t|
	getDatasyncIdsEndpoint_t|
	guide_t|
	live_chat_get_live_chat_replay_t|
	next_t|
	GetNotificationMenuBox|
	notification_get_unseen_count_t|
	notification_record_interactions|
	player_t|
	reel_reel_item_watch_t|
	reel_reel_watch_sequence_t|
	never;
