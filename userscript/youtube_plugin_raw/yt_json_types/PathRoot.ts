type LogItems=[
	"[parse_value.gen_ns] [get_transcript.params.f1]",
	"[parse_value.gen_ns] [reel.player_params.f71]",
	"[parse_value.gen_ns] [watch.params.f7]",
	"[parse_value.gen_ns] [watch.params.f12]",
	"[parse_value.gen_ns] [watch.params.f13]",
	"[parse_value.gen_ns] [watch.params.f27]",
][number];
type PathRoot=
	|SplitOnce<SplitOnce<Split<LogItems," ">[1],"[">[1],"]">[0]
	|"watch.params.f27.f1"
	|"create_playlist.params.f84.f5"
	|"create_playlist.params.f84"
	|"create_playlist.params"
	|"get_transcript.params"
	|"playlist_edit.params"
	|"record_notification_interactions.f2.f1"
	|"record_notification_interactions.f2.f14.f1.f1"
	|"record_notification_interactions.f2.f14.f1.f2"
	|"record_notification_interactions.f2.f14.f1"
	|"record_notification_interactions.f2.f14.f2"
	|"record_notification_interactions.f2.f14"
	|"record_notification_interactions.f2"
	|"record_notification_interactions.f5"
	|"record_notification_interactions"
	|"reel.player_params.f30"
	|"reel.player_params"
	|"reel.sequence_params"
	|"watch_page_url.pp"
	|"watch_playlist.params"
	|"watch.params.f2"
	|"watch.params.f24"
	|"watch.params.f3"
	|"watch.params.f33.f2"
	|"watch.params.f33.f3"
	|"watch.params.f33.f4"
	|"watch.params.f33.f5"
	|"watch.params.f33"
	|"watch.params"
	|"watch.player_params.f40.f1.f2"
	|"watch.player_params.f40.f1.f3"
	|"watch.player_params.f40.f1"
	|"watch.player_params.f40"
	|"watch.player_params.f8"
	|"watch.player_params.f9"
	|"watch.player_params"
	|"ypc_get_offers.params"
	;
;

