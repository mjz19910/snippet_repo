type TranscriptSegmentData={
	startMs: `${number}`;
	endMs: `${number}`;
	snippet: TextWithRuns;
	startTimeText: TextWithRuns;
	trackingParams: string;
	accessibility: Accessibility;
};
