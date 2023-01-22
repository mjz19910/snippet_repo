type D__EndScreenPlaylist={
	playlistId: `RD__{string}`;
	title: R_SimpleText;
	thumbnail: D__Thumbnail;
	videoCount?: `${number}`;
	longBylineText: G_Text;
	videoCountText: R_TextWithRuns;
	navigationEndpoint: E_WatchEndpoint;
	trackingParams: string;
};