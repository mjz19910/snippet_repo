type CompactRadioData={
	playlistId: `RD${"GM"}${string}`;
	thumbnail: D$Thumbnail&SampledThumbnailColor;
	title: D$SimpleText;
	navigationEndpoint: E$WatchEndpoint;
	videoCountText: D$TextWithRuns;
	secondaryNavigationEndpoint: E$WatchEndpoint;
	longBylineText: D$SimpleText;
	trackingParams: string;
	thumbnailText: D$TextWithRuns;
	videoCountShortText: D$TextWithRuns;
	shareUrl: string;
	menu: R$MenuRenderer;
	thumbnailOverlays: ThumbnailOverlayItem[];
};