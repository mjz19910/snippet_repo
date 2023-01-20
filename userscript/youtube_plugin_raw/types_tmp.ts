type PathRoot=[
	"watch_page_url.pp",
	"get_transcript.params",
	"reel.player_params",
	"reel.sequence_params",
	"playlist_edit.params",
	"watch.params",
	"watch.player_params",
	"ypc_get_offers.params",
	"create_playlist.params",
	"watch_playlist.params",
	`watch.params.f${number}`,
	"watch.params.f3",
	"watch.params.f27",
	"watch.params.f27.f1",
	"watch.params.f33",
	"watch.player_params.f8",
	"watch.player_params.f9",
	`watch.player_params.f40`,
	"watch.player_params.f40.f1",
][number];
type PathFromRoot=PathRoot|`${PathRoot}.f${number}`;