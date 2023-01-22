type D$PlaylistPanel={
	title: "YouTube Mix";
	contents: G$PlaylistPanel$contents[];
	currentIndex?: number;
	playlistId: `RD${string}`;
	ownerName?: D$TextWithRuns;
	isInfinite: true;
	continuations?: D$NextRadioContinuation[];
	shortBylineText: D$TextWithRuns;
	longBylineText?: D$TextWithRuns;
	trackingParams: string;
	titleText: D$TextWithRuns;
	isEditable: true;
	previewDescription?: {};
	numItemsToShow?: 25;
};