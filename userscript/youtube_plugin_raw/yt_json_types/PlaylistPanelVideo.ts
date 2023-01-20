type PP_Overlays=
|ThumbnailOverlayResumePlaybackRenderer
|ThumbnailOverlayTimeStatusRenderer
|ThumbnailOverlayNowPlayingRenderer
;

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
	thumbnailOverlays?: PP_Overlays[];
	playlistSetVideoId: string;
	canReorder?: true;
};
