type KeyTemplate<T>={key: T;};
type MapTemplate<T,U>={key: T; value: U;};

type ChapterRenderer={
	chapterRenderer: {
		title: SimpleText;
		timeRangeStartMillis: 0;
		onActiveCommand: {
			clickTrackingParams: string;
			setActivePanelItemAction: {};
		};
		thumbnail: Thumbnail;
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

type DescriptionChaptersItem=MapTemplate<"DESCRIPTION_CHAPTERS",{
	chapters: ChapterRenderer[];
	trackingParams: string;
	onChapterRepeat: OpenPopupAction;
}>;

type HeatSeekerItem=MapTemplate<"HEATSEEKER",{
	trackingParams: string;
	heatmap: HeatmapRenderer;
}>;

type MultiMarkersPlayerBar={
	visibleOnLoad: KeyTemplate<"DESCRIPTION_CHAPTERS">;
	markersMap: [DescriptionChaptersItem,HeatSeekerItem];
};

type MultiMarkersPlayerBarRenderer={
	multiMarkersPlayerBarRenderer: MultiMarkersPlayerBar;
};

type DecoratedPlayerBar={
	playerBar: MultiMarkersPlayerBarRenderer;
	playerBarActionButton: ButtonRenderer;
};
