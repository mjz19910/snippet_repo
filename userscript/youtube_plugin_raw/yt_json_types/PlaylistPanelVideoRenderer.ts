type PlaylistPanelVideoRenderer={
	playlistPanelVideoRenderer: {
		title: SimpleText;
		longBylineText: TextT;
		thumbnail: Thumbnail;
		lengthText: SimpleText;
		selected: false;
		navigationEndpoint: {};
		videoId: string;
		shortBylineText: TextT;
		trackingParams: string;
		menu: MenuRenderer;
		thumbnailOverlays: ThumbnailOverlayResumePlaybackRenderer[];
		playlistSetVideoId: string;
		lightColorPalette: {};
		darkColorPalette: {};
	};
};
