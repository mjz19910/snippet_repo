type D_PlaylistPanel={
	title: "YouTube Mix";
	contents: G_PlaylistPanel$contents[];
	currentIndex?: number;
	playlistId: `RD${string}`;
	ownerName?: R_TextRuns;
	isInfinite: true;
	continuations?: CD_NextRadio[];
	shortBylineText: R_TextRuns;
	longBylineText?: R_TextRuns;
	trackingParams: string;
	titleText: R_TextRuns;
	isEditable: true;
	previewDescription?: {};
	numItemsToShow?: 25;
};