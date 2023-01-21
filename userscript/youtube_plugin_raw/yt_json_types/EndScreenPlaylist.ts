type EndScreenPlaylist={
	playlistId: `RD${string}`;
	title: D$SimpleText;
	thumbnail: D$Thumbnail;
	videoCount?: `${number}`;
	longBylineText: D$TextT;
	videoCountText: D$TextWithRuns;
	navigationEndpoint: E$WatchEndpoint;
	trackingParams: string;
};