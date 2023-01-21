type PlaylistBylineRenderer={
	playlistBylineRenderer: {
		text: D$TextWithRuns;
	};
};

type YtShareData={
	canShare: false;
};

type EditableDetails={
	canDelete: false;
};

type PlaylistEditorArgs={
	playlistId: string;
};

type PlaylistEditorEndpoint={
	clickTrackingParams: string;
	commandMetadata: M$CommandMetadata;
	playlistEditorEndpoint: PlaylistEditorArgs;
};
type HeroPlaylistThumbnail={
	thumbnail: D$Thumbnail;
	maxRatio: 0.5625;
	trackingParams: string;
	onTap: E$WatchEndpoint;
	thumbnailOverlays: R$ThumbnailOverlayHoverText;
};

type HeroPlaylistThumbnailRenderer={
	heroPlaylistThumbnailRenderer: HeroPlaylistThumbnail;
};

type PlaylistHeader={
	playlistId: string;
	title: D$TextWithRuns;
	numVideosText: D$TextWithRuns;
	descriptionText: {};
	ownerText: D$TextWithRuns;
	viewCountText: D$TextWithRuns;
	shareData: YtShareData;
	isEditable: boolean;
	privacy: string;
	ownerEndpoint: E$BrowseEndpoint;
	editableDetails: EditableDetails;
	trackingParams: string;
	serviceEndpoints: EndpointTemplate<E$PlaylistEditEndpoint>[];
	stats: D$TextWithRuns[];
	briefStats: D$TextWithRuns[];
	editorEndpoint: PlaylistEditorEndpoint;
	playlistHeaderBanner: HeroPlaylistThumbnailRenderer;
	moreActionsMenu: R$MenuRenderer;
	playButton: R$ButtonRenderer;
	shufflePlayButton: R$ButtonRenderer;
	onDescriptionTap: OpenPopupAction;
	cinematicContainer: R$CinematicContainer;
	byline: PlaylistBylineRenderer[];
	descriptionTapText: D$TextWithRuns;
};
