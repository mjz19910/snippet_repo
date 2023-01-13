type PlayerMicroformatData={
	thumbnail: Thumbnail;
	embed: MicroformatEmbed;
	title: TextT;
	description?: TextT;
	lengthSeconds: `${number}`;
	ownerProfileUrl: `http://www.youtube.com/channel/UC${string}`;
	externalChannelId: ChannelId;
	isFamilySafe: boolean;
	availableCountries: string[];
	isUnlisted: boolean;
	hasYpcMetadata: boolean;
	viewCount: `${number}`;
	category: YtCategoryStr;
	publishDate: string;
	ownerChannelName: string;
	liveBroadcastDetails?: LiveBroadcastDetails;
	uploadDate: string;
};