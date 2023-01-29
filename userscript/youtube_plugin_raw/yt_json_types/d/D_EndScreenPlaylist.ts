type D_EndScreenPlaylist={
	playlistId: `RD${string}`;
	title: D_Text;
	thumbnail: R_Thumbnail;
	videoCount?: `${number}`;
	longBylineText: D_Text;
	videoCountText: D_Text;
	navigationEndpoint: E_Watch;
	trackingParams: string;
};