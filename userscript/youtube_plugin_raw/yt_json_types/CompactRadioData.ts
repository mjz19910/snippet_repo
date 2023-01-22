type D$CompactRadio={
	playlistId: `RD${"GM"}${string}`;
	thumbnail: D$Thumbnail&SampledThumbnailColor;
	title: R$SimpleText;
	navigationEndpoint: E$WatchEndpoint;
	videoCountText: R$TextWithRuns;
	secondaryNavigationEndpoint: E$WatchEndpoint;
	longBylineText: R$SimpleText;
	trackingParams: string;
	thumbnailText: R$TextWithRuns;
	videoCountShortText: R$TextWithRuns;
	shareUrl: string;
	menu: R$Menu;
	thumbnailOverlays: G$ThumbnailOverlayItem[];
};