import {att_get_response} from "../a/att_get_response.js";
import {browse_t} from "../b/browse_t.js";
import {feedback_t} from "../f/feedback_t.js";
import {getDatasyncIdsEndpoint_t} from "../g/getDatasyncIdsEndpoint_t.js";
import {GetNotificationMenuBox} from "../g/GetNotificationMenuBox.js";
import {get_transcript_t} from "../g/json/get_transcript_t.js";
import {guide_t} from "../g/guide_t.js";
import {live_chat_get_live_chat_replay_t} from "../l/live_chat_get_live_chat_replay_t.js";
import {next_t} from "../n/next_t.js";
import {notification_get_unseen_count_t} from "../n/notification_get_unseen_count_t.js";
import {notification_record_interactions} from "../n/notification_record_interactions.js";
import {account_account_menu_t} from "../p/account_account_menu_t.js";
import {player_t} from "../p/player_t.js";
import {reel_reel_item_watch_t} from "./reel_reel_item_watch_t.js";
import {reel_reel_watch_sequence_t} from "./reel_reel_watch_sequence_t.js";

export type ResponseTypes=
	account_account_menu_t|
	att_get_response|
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
