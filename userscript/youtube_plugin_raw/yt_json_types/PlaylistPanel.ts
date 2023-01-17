type PlaylistPanel={
	title: "YouTube Mix";
	contents: PlaylistPanelItem[];
	currentIndex?: number;
	playlistId: `RD${string}`;
	ownerName: {};
	isInfinite: true;
	continuations?: NextRadioContinuationData[];
	shortBylineText: TextWithRuns;
	longBylineText: {};
	trackingParams: string;
	titleText: TextWithRuns;
	isEditable: true;
	previewDescription: {};
	numItemsToShow: 25;
};