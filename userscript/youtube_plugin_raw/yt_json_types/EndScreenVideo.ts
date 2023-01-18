type EndScreenVideo={
	videoId: string;
	thumbnail: Thumbnail;
	title: SimpleText;
	shortBylineText: TextWithRuns;
	lengthText?: SimpleText;
	lengthInSeconds?: number;
	navigationEndpoint: WatchEndpoint;
	trackingParams: string;
	shortViewCountText: TextT;
	publishedTimeText: SimpleText;
	thumbnailOverlays: ThumbnailOverlayItem[];
};