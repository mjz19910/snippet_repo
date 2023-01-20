type EndScreenPlaylist={
	playlistId: `RD${string}`;
	title: SimpleText;
	thumbnail: Thumbnail;
	videoCount?: `${number}`;
	longBylineText: TextT;
	videoCountText: TextWithRuns;
	navigationEndpoint: E$WatchEndpoint;
	trackingParams: string;
};