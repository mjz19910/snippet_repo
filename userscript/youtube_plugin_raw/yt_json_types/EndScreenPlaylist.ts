type D_EndScreenPlaylist={
	playlistId: `RD__{string}`;
	title: R_SimpleText;
	thumbnail: D_Thumbnail;
	videoCount?: `${number}`;
	longBylineText: G_Text;
	videoCountText: R_TextWithRuns;
	navigationEndpoint: E_Watch;
	trackingParams: string;
};