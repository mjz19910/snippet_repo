type PlaylistHeader={
	playlistId: string;
	title: TextWithRuns;
	numVideosText: TextWithRuns;
	descriptionText: {};
	ownerText: TextWithRuns;
	viewCountText: TextWithRuns;
	shareData: {};
	isEditable: boolean;
	privacy: string;
	ownerEndpoint: {};
	editableDetails: {};
	trackingParams: string;
	serviceEndpoints: {}[];
	stats: TextWithRuns[];
	briefStats: TextWithRuns[];
	editorEndpoint: {};
	playlistHeaderBanner: {};
	moreActionsMenu: MenuRenderer;
	playButton: ButtonRenderer;
	shufflePlayButton: ButtonRenderer;
	onDescriptionTap: {};
	cinematicContainer: CinematicContainerRenderer;
	byline: {
		playlistBylineRenderer: {
			text: TextWithRuns;
		};
	}[];
	descriptionTapText: TextWithRuns;
};
