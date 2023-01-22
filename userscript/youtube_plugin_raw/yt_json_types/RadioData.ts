type D$Radio={
	playlistId: `RD${string}`;
	title: R$SimpleText;
	thumbnail: D$Thumbnail;
	videoCountText: R$TextWithRuns;
	navigationEndpoint: E$WatchEndpoint;
	trackingParams: string;
	videos: R$ChildVideo[];
	thumbnailText: R$TextWithRuns;
	longBylineText: R$SimpleText;
	menu: R$Menu;
	thumbnailOverlays: G$ThumbnailOverlayItem[];
	videoCountShortText: R$TextWithRuns;
};