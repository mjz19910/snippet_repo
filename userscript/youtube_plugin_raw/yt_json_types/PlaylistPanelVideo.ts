type PP_Overlays=
|ThumbnailOverlayResumePlaybackRenderer
|ThumbnailOverlayTimeStatusRenderer
|ThumbnailOverlayNowPlayingRenderer
;

type PlaylistPanelVideo={
	title: D$SimpleText;
	longBylineText: D$TextWithRuns;
	thumbnail: Thumbnail;
	lengthText: D$SimpleText;
	indexText: D$SimpleText;
	selected: true;
	navigationEndpoint: E$WatchEndpoint;
	videoId: string;
	shortBylineText: D$TextWithRuns;
	trackingParams: string;
	menu: MenuRenderer;
	thumbnailOverlays: PP_Overlays[];
	playlistSetVideoId: "56B44F6D10557CC6";
	lightColorPalette: {
		section2Color: 4076401393;
		primaryTitleColor: 4279833104;
		secondaryTitleColor: 4286207567;
		section4Color: 4075544541;
	};
	darkColorPalette: {
		section2Color: 4063436571;
		primaryTitleColor: 4294961637;
		secondaryTitleColor: 4291602851;
		section4Color: 4061728525;
	};
};
