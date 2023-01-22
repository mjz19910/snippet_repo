type D__EndScreenVideo={
	videoId: string;
	thumbnail: D__Thumbnail;
	title: R$SimpleText;
	shortBylineText: R$TextWithRuns;
	lengthText?: R$SimpleText;
	lengthInSeconds?: number;
	navigationEndpoint: E$WatchEndpoint|E$ReelWatchEndpoint;
	trackingParams: string;
	shortViewCountText: G_Text;
	publishedTimeText: R$SimpleText;
	thumbnailOverlays: G_ThumbnailOverlayItem[];
};