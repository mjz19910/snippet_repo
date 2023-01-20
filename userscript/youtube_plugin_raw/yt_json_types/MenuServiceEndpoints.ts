type MenuServiceEndpoints=
	|E_LikeEndpoint
	|E_NotificationOptOutEndpoint
	|E_PlaylistEditEndpoint
	|E$GetReportFormEndpoint
	|E$ShareEntityServiceEndpoint
	|E_Endpoint&{addToPlaylistServiceEndpoint: {videoId: string;};}
	|E_Endpoint&{feedbackEndpoint: AE_Feedback;}
	;

type E$ShareEntityServiceEndpoint=E_Endpoint&{
	shareEntityServiceEndpoint: {
		serializedShareEntity: string;
		commands: OpenPopupAction[];
	};
};