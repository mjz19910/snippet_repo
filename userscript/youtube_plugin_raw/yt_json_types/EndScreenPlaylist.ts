type EndScreenPlaylist={
	playlistId: `RD${string}`;
	title: SimpleText;
	thumbnail: Thumbnail;
	videoCount?: `${number}`;
	longBylineText: TextT;
	videoCountText: TextWithRuns;
	navigationEndpoint: WatchEndpoint;
	trackingParams: string;
};