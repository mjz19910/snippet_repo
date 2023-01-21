type KeyTemplate<T>={key: T;};
type MapTemplate<T,U>={key: T; value: U;};

type ChapterRenderer={
	chapterRenderer: {
		title: D$SimpleText;
		timeRangeStartMillis: 0;
		onActiveCommand: {
			clickTrackingParams: string;
			setActivePanelItemAction: {};
		};
		thumbnail: D$Thumbnail;
	};
};

type HeatmapRenderer={
	heatmapRenderer: {
		maxHeightDp: 40;
		minHeightDp: 4;
		showHideAnimationDurationMillis: 200;
		heatMarkers: {
			heatMarkerRenderer: {};
		}[];
		heatMarkersDecorations: {
			timedMarkerDecorationRenderer: {};
		}[];
	};
};

type DescriptionChapters={
	chapters: ChapterRenderer[];
	trackingParams: string;
	onChapterRepeat: OpenPopupAction;
};

type DescriptionChaptersItem=MapTemplate<"DESCRIPTION_CHAPTERS",DescriptionChapters>;

type HeatSeekerItemData={
	trackingParams: string;
	heatmap: HeatmapRenderer;
};

type HeatSeekerItem=MapTemplate<"HEATSEEKER",HeatSeekerItemData>;

type MultiMarkersPlayerBar={
	visibleOnLoad: KeyTemplate<"DESCRIPTION_CHAPTERS"|"">;
	markersMap: [DescriptionChaptersItem,HeatSeekerItem];
};

type MultiMarkersPlayerBarRenderer={
	multiMarkersPlayerBarRenderer: MultiMarkersPlayerBar;
};

type DecoratedPlayerBar={
	playerBar: MultiMarkersPlayerBarRenderer;
	playerBarActionButton?: R$ButtonRenderer;
};
