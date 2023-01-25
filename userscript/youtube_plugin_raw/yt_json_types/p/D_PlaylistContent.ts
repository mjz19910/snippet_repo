type D_PlaylistContent=Record<"contents",R_PlaylistPanelVideo[]>&{
	title: string;
	currentIndex: number;
	playlistId: PlaylistId;
	ownerName: R_SimpleText;
	isInfinite: boolean;
	playlistShareUrl: `http://www.youtube.com/watch?v=${string}&list=${string}`;
	shortBylineText: R_SimpleText;
	longBylineText: R_SimpleText;
	trackingParams: string;
	titleText: R_SimpleText;
	isEditable: true;
	menu: R_Menu;
	localCurrentIndex: 0|25;
	playlistButtons: R_Menu;
	isCourse: false;
	nextVideoLabel: R_SimpleText;
};