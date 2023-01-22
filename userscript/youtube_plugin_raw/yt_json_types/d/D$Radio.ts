type D__Radio={
	playlistId: `RD__{string}`;
	title: R$SimpleText;
	thumbnail: D__Thumbnail;
	videoCountText: R$TextWithRuns;
	navigationEndpoint: E$WatchEndpoint;
	trackingParams: string;
	videos: R$ChildVideo[];
	thumbnailText: R$TextWithRuns;
	longBylineText: R$SimpleText;
	menu: R$Menu;
	thumbnailOverlays: G_ThumbnailOverlayItem[];
	videoCountShortText: R$TextWithRuns;
};