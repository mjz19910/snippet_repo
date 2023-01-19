type BrowseEndpointPages=
	|SplitOnce<Split<VE6827_PageUrl,"/">[2],"?">[0]
	|"music_charts"
	|"music_explore"
	|"music_home"
	|"music_library_corpus_artists"
	|"music_library_corpus_track_artists"
	|"music_library_landing"
	|"music_liked_albums"
	|"music_liked_playlists"
	|"music_liked_videos"
	|"music_moods_and_genres_category"
	|"music_moods_and_genres"
	|"music_new_releases"
	|"subscriptions"
	|"what_to_watch"
	;
type uu=SplitOnce<Split<VE6827_PageUrl,"/">[2],"?">[0];