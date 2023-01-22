type PlaylistContent=T$AR$Contents<R$PlaylistPanelVideo>&{
	title: string;
	currentIndex: number;
	playlistId: PlaylistId;
	ownerName: R$SimpleText;
	isInfinite: boolean;
	playlistShareUrl: `http://www.youtube.com/watch?v=${string}&list=${string}`;
	shortBylineText: R$SimpleText;
	longBylineText: R$SimpleText;
	trackingParams: string;
	titleText: R$SimpleText;
	isEditable: true;
	menu: R$Menu;
	localCurrentIndex: 0|25;
	playlistButtons: R$Menu;
	isCourse: false;
	nextVideoLabel: R$SimpleText;
};