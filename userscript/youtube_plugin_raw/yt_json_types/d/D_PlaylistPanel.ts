type D_PlaylistPanel={
	title: "YouTube Mix";
	contents: G_PlaylistPanel$contents[];
	currentIndex?: number;
	playlistId: `RD${string}`;
	ownerName?: G_Text;
	isInfinite: true;
	continuations?: CD_NextRadio[];
	shortBylineText: G_Text;
	longBylineText?: G_Text;
	trackingParams: string;
	titleText: G_Text;
	isEditable: true;
	previewDescription?: {};
	numItemsToShow?: 25;
};