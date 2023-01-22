type D_PlaylistPanel={
	title: "YouTube Mix";
	contents: G_PlaylistPanel$contents[];
	currentIndex?: number;
	playlistId: `RD__{string}`;
	ownerName?: R_TextWithRuns;
	isInfinite: true;
	continuations?: D_NextRadioContinuation[];
	shortBylineText: R_TextWithRuns;
	longBylineText?: R_TextWithRuns;
	trackingParams: string;
	titleText: R_TextWithRuns;
	isEditable: true;
	previewDescription?: {};
	numItemsToShow?: 25;
};