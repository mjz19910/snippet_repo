type D_MarkerItem={
	title: G_Text;
	startMillis: `${number}`;
	durationMillis: "10000";
	thumbnailDetails: D_Thumbnail;
	onActive: C_Innertube;
};
type D_MarkersList={
	markerType: "MARKER_TYPE_TIMESTAMPS";
	markers: D_MarkerItem[];
	headerTitle: G_Text;
	onTap: C_Innertube;
	loggingDirectives: D_LoggingDirectives;
};
type DS_EY_MacroMarkersList={key: string;}|{
	key: string;
	externalVideoId: string;
	markersList: D_MarkersList;
};
type DS_EY_Subscription={key: string; subscribed: boolean;};
type DS_EY_PlaylistLoop={key: string; state: T_EnumStr<"PLAYLIST_LOOP_STATE","ALL"|"NONE"|"ONE">;};
type DS_EY_TranscriptTrackSelection={key: string; selectedTrackIndex: number; serializedParams: string;};
type DS_EY_TranscriptSearchBox={key: string; isHidden: false;};
