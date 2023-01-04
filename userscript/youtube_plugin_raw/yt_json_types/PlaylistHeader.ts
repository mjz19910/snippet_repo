type PlaylistHeader={
	playlistId: string;
	title: TextT;
	numVideosText: TextT;
	descriptionText: {};
	ownerText: TextT;
	viewCountText: TextT;
	shareData: {};
	isEditable: boolean;
	privacy: string;
	ownerEndpoint: YtEndpoint;
	editableDetails: {};
	trackingParams: string;
	serviceEndpoints: YtEndpoint[];
	stats: TextT[];
	briefStats: TextT[];
	editorEndpoint: YtEndpoint;
	playlistHeaderBanner: {};
	moreActionsMenu: MenuRenderer;
	playButton: ButtonRenderer;
	shufflePlayButton: ButtonRenderer;
	onDescriptionTap: {};
	cinematicContainer: CinematicContainerRenderer;
	byline: {
		playlistBylineRenderer: {
			text: TextT;
		};
	}[];
	descriptionTapText: TextT;
};
