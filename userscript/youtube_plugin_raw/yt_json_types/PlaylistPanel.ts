type PlaylistPanel={
	title: "YouTube Mix";
	contents: PlaylistPanelItem[];
	currentIndex?: number;
	playlistId: `RD${string}`;
	ownerName?: D$TextWithRuns;
	isInfinite: true;
	continuations?: NextRadioContinuationData[];
	shortBylineText: D$TextWithRuns;
	longBylineText?: D$TextWithRuns;
	trackingParams: string;
	titleText: D$TextWithRuns;
	isEditable: true;
	previewDescription?: {};
	numItemsToShow?: 25;
};