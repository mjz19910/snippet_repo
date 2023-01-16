type CompactRadioData={
	playlistId: `RD${"GM"}${string}`;
	thumbnail: Thumbnail&SampledThumbnailColor;
	title: SimpleText;
	navigationEndpoint: WatchEndpoint;
	videoCountText: TextWithRuns;
	secondaryNavigationEndpoint: WatchEndpoint;
	longBylineText: SimpleText;
	trackingParams: string;
	thumbnailText: TextWithRuns;
	videoCountShortText: TextWithRuns;
	shareUrl: string;
	menu: MenuRenderer;
	thumbnailOverlays: ThumbnailOverlayItem[];
};