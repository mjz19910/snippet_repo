type PlaylistPanelVideoRenderer={
	playlistPanelVideoRenderer: {
		title: SimpleText;
		longBylineText: TextWithRuns;
		thumbnail: Thumbnail;
		lengthText: SimpleText;
		selected: false;
		navigationEndpoint: {};
		videoId: string;
		shortBylineText: TextWithRuns;
		trackingParams: string;
		menu: MenuRenderer;
		thumbnailOverlays: ThumbnailOverlayResumePlaybackRenderer[];
		playlistSetVideoId: string;
		lightColorPalette: {};
		darkColorPalette: {};
	};
};
