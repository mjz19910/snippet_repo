type PlaylistPanel={
	title: "YouTube Mix";
	contents: PlaylistPanelItem[];
	currentIndex?: number;
	playlistId: `RD${string}`;
	ownerName?: TextWithRuns;
	isInfinite: true;
	continuations?: NextRadioContinuationData[];
	shortBylineText: TextWithRuns;
	longBylineText?: TextWithRuns;
	trackingParams: string;
	titleText: TextWithRuns;
	isEditable: true;
	previewDescription?: {};
	numItemsToShow: 25;
};