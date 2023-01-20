type PlaylistContent=ContentsArrayTemplate<PlaylistPanelVideoRenderer>&{
	title: string;
	currentIndex: number;
	playlistId: PlaylistId;
	ownerName: SimpleText;
	isInfinite: boolean;
	playlistShareUrl: `http://www.youtube.com/watch?v=${string}&list=${string}`;
	shortBylineText: SimpleText;
	longBylineText: SimpleText;
	trackingParams: string;
	titleText: SimpleText;
	isEditable: true;
	menu: MenuRenderer;
	localCurrentIndex: 25;
	playlistButtons: MenuRenderer;
	isCourse: false;
	nextVideoLabel: SimpleText;
};