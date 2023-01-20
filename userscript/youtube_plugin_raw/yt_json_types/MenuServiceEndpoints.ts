type E$FeedbackEndpoint=EB$Endpoint&{
	feedbackEndpoint: E$Feedback;
};

type MenuServiceEndpoints=
	|E$LikeEndpoint
	|E$NotificationOptOutEndpoint
	|E$PlaylistEditEndpoint
	|E$GetReportFormEndpoint
	|E$ShareEntityServiceEndpoint
	|EB$Endpoint&{addToPlaylistServiceEndpoint: {videoId: string;};}
	|EB$Endpoint&E$FeedbackEndpoint
	;
