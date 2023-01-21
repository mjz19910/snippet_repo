type TranscriptSegmentData={
	startMs: `${number}`;
	endMs: `${number}`;
	snippet: D$TextWithRuns;
	startTimeText: D$TextWithRuns;
	trackingParams: string;
	accessibility: A$Accessibility;
	targetId?: `${string}.${string}.${string}.${string}`;
};
