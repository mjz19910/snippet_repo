type D$Radio={
	playlistId: `RD${string}`;
	title: D$SimpleText;
	thumbnail: D$Thumbnail;
	videoCountText: D$TextWithRuns;
	navigationEndpoint: E$WatchEndpoint;
	trackingParams: string;
	videos: R$ChildVideo[];
	thumbnailText: D$TextWithRuns;
	longBylineText: D$SimpleText;
	menu: R$Menu;
	thumbnailOverlays: G$ThumbnailOverlayItem[];
	videoCountShortText: D$TextWithRuns;
};