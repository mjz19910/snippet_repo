type PlaylistPanelVideo={
	title: TextT;
	longBylineText: TextWithRuns;
	thumbnail: Thumbnail;
	lengthText: TextT;
	selected: boolean;
	navigationEndpoint: WatchEndpoint;
	videoId: string;
	shortBylineText: TextWithRuns;
	trackingParams: string;
	menu: MenuRenderer;
	thumbnailOverlays: ThumbnailOverlayResumePlaybackRenderer[];
	playlistSetVideoId: string;
	canReorder?: true;
};
