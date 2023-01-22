type D$TranscriptSegment={
	startMs: `${number}`;
	endMs: `${number}`;
	snippet: D$TextWithRuns;
	startTimeText: D$TextT;
	trackingParams: string;
	accessibility: A$Accessibility;
	targetId?: `${string}.${string}.${number}.${number}`;
};