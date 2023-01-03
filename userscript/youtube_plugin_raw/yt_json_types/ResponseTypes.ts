type ResponseTypes=
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
	watch_t|
	channel_t|
	playlist_t|
	settings_t|
	shorts_t|
	{
		type: "att.log";
		data: {};
	}|{
		type: "notification.modify_channel_preference";
		data: {};
	}|
	never;