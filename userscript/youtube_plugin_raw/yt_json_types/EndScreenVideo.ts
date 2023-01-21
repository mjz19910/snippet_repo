type EndScreenVideo={
	videoId: string;
	thumbnail: Thumbnail;
	title: D$SimpleText;
	shortBylineText: D$TextWithRuns;
	lengthText?: D$SimpleText;
	lengthInSeconds?: number;
	navigationEndpoint: E$WatchEndpoint;
	trackingParams: string;
	shortViewCountText: D$TextT;
	publishedTimeText: D$SimpleText;
	thumbnailOverlays: ThumbnailOverlayItem[];
};