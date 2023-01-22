type D$EndScreenPlaylist={
	playlistId: `RD${string}`;
	title: D$SimpleText;
	thumbnail: D$Thumbnail;
	videoCount?: `${number}`;
	longBylineText: G$Text;
	videoCountText: D$TextWithRuns;
	navigationEndpoint: E$WatchEndpoint;
	trackingParams: string;
};