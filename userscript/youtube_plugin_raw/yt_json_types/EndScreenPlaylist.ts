type D$EndScreenPlaylist={
	playlistId: `RD${string}`;
	title: R$SimpleText;
	thumbnail: D$Thumbnail;
	videoCount?: `${number}`;
	longBylineText: G$Text;
	videoCountText: R$TextWithRuns;
	navigationEndpoint: E$WatchEndpoint;
	trackingParams: string;
};