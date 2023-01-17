type PlaylistPanel={
	title: "YouTube Mix";
	contents: PlaylistPanelItem[];
	currentIndex?: number;
	playlistId: `RD${string}`;
	isInfinite: true;
	continuations?: NextRadioContinuationData[];
	shortBylineText: TextWithRuns;
	trackingParams: string;
	titleText: TextWithRuns;
	isEditable: true;
	previewDescription: {};
	numItemsToShow: 25;
};