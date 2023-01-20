type CompactRadioData={
	playlistId: `RD${"GM"}${string}`;
	thumbnail: Thumbnail&SampledThumbnailColor;
	title: SimpleText;
	navigationEndpoint: E$WatchEndpoint;
	videoCountText: TextWithRuns;
	secondaryNavigationEndpoint: E$WatchEndpoint;
	longBylineText: SimpleText;
	trackingParams: string;
	thumbnailText: TextWithRuns;
	videoCountShortText: TextWithRuns;
	shareUrl: string;
	menu: MenuRenderer;
	thumbnailOverlays: ThumbnailOverlayItem[];
};