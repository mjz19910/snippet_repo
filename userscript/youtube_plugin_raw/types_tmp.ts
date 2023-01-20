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
][number];
type PathFromRoot=PathRoot|`${PathRoot}.f${number}`;