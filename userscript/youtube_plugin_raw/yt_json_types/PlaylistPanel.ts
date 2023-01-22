type D$PlaylistPanel={
	title: "YouTube Mix";
	contents: G$PlaylistPanel$contents[];
	currentIndex?: number;
	playlistId: `RD${string}`;
	ownerName?: R$TextWithRuns;
	isInfinite: true;
	continuations?: D$NextRadioContinuation[];
	shortBylineText: R$TextWithRuns;
	longBylineText?: R$TextWithRuns;
	trackingParams: string;
	titleText: R$TextWithRuns;
	isEditable: true;
	previewDescription?: {};
	numItemsToShow?: 25;
};