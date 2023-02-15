type D_VideoDetails={
	videoId: string;
	title: string;
	lengthSeconds: `${number}`;
	keywords: string[];
	channelId: `UC${string}`;
	isOwnerViewing: false;
	shortDescription: string;
	isCrawlable: true;
	thumbnail: D_Thumbnail;
	allowRatings: true;
	viewCount?: `${number}`;
	author: string;
	isPrivate: false;
	isUnpluggedCorpus: false;
	isLiveContent: false;
};
