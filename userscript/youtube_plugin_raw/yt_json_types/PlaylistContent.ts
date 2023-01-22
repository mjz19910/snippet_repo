type PlaylistContent=ContentsArrayTemplate<PlaylistPanelVideoRenderer>&{
	title: string;
	currentIndex: number;
	playlistId: PlaylistId;
	ownerName: D$SimpleText;
	isInfinite: boolean;
	playlistShareUrl: `http://www.youtube.com/watch?v=${string}&list=${string}`;
	shortBylineText: D$SimpleText;
	longBylineText: D$SimpleText;
	trackingParams: string;
	titleText: D$SimpleText;
	isEditable: true;
	menu: R$Menu;
	localCurrentIndex: 0|25;
	playlistButtons: R$Menu;
	isCourse: false;
	nextVideoLabel: D$SimpleText;
};