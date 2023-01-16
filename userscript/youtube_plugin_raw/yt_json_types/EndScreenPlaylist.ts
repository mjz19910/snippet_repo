type EndScreenPlaylist={
	playlistId: `RD${string}`;
	title: SimpleText;
	thumbnail: Thumbnail;
	videoCount?: `${number}`;
	longBylineText: SimpleText;
	videoCountText: TextT;
	navigationEndpoint: WatchEndpoint;
	trackingParams: string;
};