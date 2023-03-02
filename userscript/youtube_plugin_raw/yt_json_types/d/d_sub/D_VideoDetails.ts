type D_VideoDetails={
	videoId: string;
	title: string;
	lengthSeconds: `${number}`;
	isLive?: true;
	keywords?: string[];
	channelId: `UC${string}`;
	isOwnerViewing: false;
	shortDescription: string;
	isCrawlable: true;
	isLiveDvrEnabled?: true;
	thumbnail: D_Thumbnail;
	liveChunkReadahead?: 2;
	allowRatings: boolean;
	viewCount?: `${number}`;
	author: string;
	isLowLatencyLiveStream?: false;
	isPrivate: false;
	isUnpluggedCorpus: false;
	latencyClass?: "MDE_STREAM_OPTIMIZATIONS_RENDERER_LATENCY_NORMAL";
	isLiveContent: boolean;
	isPostLiveDvr?: true;
};