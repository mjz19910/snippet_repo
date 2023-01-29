type D_PlaylistContent=Record<"contents",R_PlaylistPanelVideo[]>&{
	title: string;
	currentIndex: number;
	playlistId: PlaylistId;
	ownerName: D_Text;
	isInfinite: boolean;
	playlistShareUrl: `http://www.youtube.com/watch?v=${string}&list=${string}`;
	shortBylineText: D_Text;
	longBylineText: D_Text;
	trackingParams: string;
	titleText: D_Text;
	isEditable: true;
	menu: R_Menu;
	localCurrentIndex: 0|25;
	playlistButtons: R_Menu;
	isCourse: false;
	nextVideoLabel: D_Text;
};