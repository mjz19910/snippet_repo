type MenuServiceEndpoints=
	|E_NotificationOptOutEndpoint
	|E_PlaylistEditEndpoint
	|E$GetReportFormEndpoint
	|{
		addToPlaylistServiceEndpoint: {
			videoId: string;
		};
	}
	;
