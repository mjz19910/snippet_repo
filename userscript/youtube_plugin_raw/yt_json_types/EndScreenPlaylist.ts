type EndScreenPlaylist={
	playlistId: `RD${string}`;
	title: D$SimpleText;
	thumbnail: Thumbnail;
	videoCount?: `${number}`;
	longBylineText: D$TextT;
	videoCountText: D$TextWithRuns;
	navigationEndpoint: E$WatchEndpoint;
	trackingParams: string;
};