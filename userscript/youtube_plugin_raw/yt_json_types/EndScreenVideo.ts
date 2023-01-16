// type ThumbnailOverlayItem=ThumbnailOverlayTimeStatusRenderer;

type EndScreenVideo={
	videoId: string;
	thumbnail: Thumbnail;
	title: SimpleText;
	shortBylineText: TextT;
	lengthText: SimpleText;
	lengthInSeconds: number;
	navigationEndpoint: WatchEndpoint;
	trackingParams: string;
	shortViewCountText: SimpleText;
	publishedTimeText: SimpleText;
	thumbnailOverlays: ThumbnailOverlayItem[];
};