type D_PlaylistContent=Record<"contents",R_PlaylistPanelVideo[]>&{
	title: string;
	currentIndex: number;
	playlistId: PlaylistId;
	ownerName: G_Text;
	isInfinite: boolean;
	playlistShareUrl: `http://www.youtube.com/watch?v=${string}&list=${string}`;
	shortBylineText: G_Text;
	longBylineText: G_Text;
	trackingParams: string;
	titleText: G_Text;
	isEditable: true;
	menu: R_Menu;
	localCurrentIndex: 0|25;
	playlistButtons: R_Menu;
	isCourse: false;
	nextVideoLabel: G_Text;
};