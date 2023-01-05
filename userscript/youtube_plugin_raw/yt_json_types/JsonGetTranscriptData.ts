type TranscriptSegmentData={
	startMs: `${number}`;
	endMs: `${number}`;
	snippet: TextT;
	startTimeText: TextT;
	trackingParams: string;
	accessibility: Accessibility;
};

type TranscriptSegmentRenderer={
	transcriptSegmentRenderer: TranscriptSegmentData;
};

type TranscriptSegmentListData={
	initialSegments: TranscriptSegmentRenderer[];
	noResultLabel: TextT;
	retryLabel: TextT;
	touchCaptionsEnabled: boolean;
};

type TranscriptSegmentListRenderer={
	transcriptSegmentListRenderer: TranscriptSegmentListData;
};

type TranscriptFooterData={
	languageMenu: SortFilterSubMenuRenderer;
};

type TranscriptFooterRenderer={
	transcriptFooterRenderer: TranscriptFooterData;
};

type TranscriptSearchPanelData={
	body: TranscriptSegmentListRenderer;
	footer: TranscriptFooterRenderer;
	trackingParams: string;
	targetId: "engagement-panel-searchable-transcript-search-panel";
};

type transcriptSearchPanelRenderer={
	transcriptSearchPanelRenderer: TranscriptSearchPanelData;
};

type TranscriptData={
	trackingParams: string;
	content: transcriptSearchPanelRenderer;
};

type transcriptRenderer={
	transcriptRenderer: TranscriptData;
};

type updateEngagementPanel={
	targetId: "engagement-panel-searchable-transcript";
	content: transcriptRenderer;
};

type updateEngagementPanelAction={
	updateEngagementPanelAction: updateEngagementPanel;
	clickTrackingParams: string;
};

type JsonGetTranscriptData={
	responseContext: ResponseContext;
	actions: updateEngagementPanelAction[];
	trackingParams: string;
};
