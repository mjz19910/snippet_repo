type CompactRadioData={
	playlistId: `RD${"GM"}${string}`;
	thumbnail: Thumbnail<{}>;
	title: SimpleText;
	navigationEndpoint: WatchEndpoint;
	videoCountText: TextT;
	secondaryNavigationEndpoint: WatchEndpoint;
	longBylineText: SimpleText;
	trackingParams: string;
	thumbnailText: TextT;
	videoCountShortText: TextT;
	shareUrl: string;
	menu: MenuRenderer;
	thumbnailOverlays: ThumbnailOverlayItem[];
};