type D_PlaylistPanel={
	title: "YouTube Mix";
	contents: G_PlaylistPanel$contents[];
	currentIndex?: number;
	playlistId: `RD${string}`;
	ownerName?: D_Text;
	isInfinite: true;
	continuations?: CD_NextRadio[];
	shortBylineText: D_Text;
	longBylineText?: D_Text;
	trackingParams: string;
	titleText: D_Text;
	isEditable: true;
	previewDescription?: {};
	numItemsToShow?: 25;
};