type D_EndScreenPlaylist={
	playlistId: `RD${string}`;
	title: R_SimpleText;
	thumbnail: R_Thumbnail;
	videoCount?: `${number}`;
	longBylineText: G_Text;
	videoCountText: R_TextRuns;
	navigationEndpoint: E_Watch;
	trackingParams: string;
};