type MenuServiceEndpoints=
	|E_NotificationOptOutEndpoint
	|E_PlaylistEditEndpoint
	|E$GetReportFormEndpoint
	|E$ShareEntityServiceEndpoint
	|{addToPlaylistServiceEndpoint: {videoId: string;};}
	|{feedbackEndpoint: AE_Feedback;}
	;

	type E$ShareEntityServiceEndpoint={
		shareEntityServiceEndpoint: {
			serializedShareEntity: string;
			commands: OpenPopupAction[];
		};
	};