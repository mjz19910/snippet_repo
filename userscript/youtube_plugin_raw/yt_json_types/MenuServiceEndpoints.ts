type MenuServiceEndpoints=
	|E_PlaylistEditEndpoint
	|E$GetReportFormEndpoint
	|{
		addToPlaylistServiceEndpoint: {
			videoId: string;
		};
	}
	;
