type D_EndScreenPlaylist={
	playlistId: `RD${string}`;
	title: G_Text;
	thumbnail: R_Thumbnail;
	videoCount?: `${number}`;
	longBylineText: G_Text;
	videoCountText: G_Text;
	navigationEndpoint: E_Watch;
	trackingParams: string;
};