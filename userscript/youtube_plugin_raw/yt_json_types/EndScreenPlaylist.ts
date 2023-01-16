type EndScreenPlaylist={
	playlistId: `RD${string}`;
	title: SimpleText;
	thumbnail: Thumbnail;
	longBylineText: SimpleText;
	videoCountText: TextT;
	navigationEndpoint: WatchEndpoint;
	trackingParams: string;
};