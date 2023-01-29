type D_Channel_MD={
	title: string;
	description: string;
	rssUrl: string;
	externalId: `UC${string}`;
	keywords: string;
	ownerUrls: [`http://www.youtube.com/@${string}`];
	avatar: R_Thumbnail;
	channelUrl: string;
	isFamilySafe: true;
	availableCountryCodes: string[];
	androidDeepLink: string;
	androidAppindexingLink: string;
	iosAppindexingLink: string;
	vanityChannelUrl: `http://www.youtube.com/@${string}`;
};