type DS_EY_MacroMarkersList={key: string;};
type D_EY_Offlineability={
	key: string;
	command: C_Innertube;
	addToOfflineButtonState: D_AddToOfflineButtonState;
	contentCheckOk: false;
	racyCheckOk: false;
	loggingDirectives: D_LoggingDirectives;
};
type DS_EY_Subscription={key: string; subscribed: true;};
type DS_EY_PlaylistLoop={key: string; state: T_EnumStr<"PLAYLIST_LOOP_STATE","NONE">;};
type DS_EY_TranscriptTrackSelection={key: string; selectedTrackIndex: 0; serializedParams: string;};
type DS_EY_TranscriptSearchBox={key: string; isHidden: false;};