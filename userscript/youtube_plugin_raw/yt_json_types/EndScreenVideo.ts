type EndScreenVideo={
	videoId: string;
	thumbnail: D$Thumbnail;
	title: D$SimpleText;
	shortBylineText: D$TextWithRuns;
	lengthText?: D$SimpleText;
	lengthInSeconds?: number;
	navigationEndpoint: E$WatchEndpoint|E$ReelWatchEndpoint;
	trackingParams: string;
	shortViewCountText: D$TextT;
	publishedTimeText: D$SimpleText;
	thumbnailOverlays: G$ThumbnailOverlayItem[];
};