type D$TranscriptSegment={
	startMs: `${number}`;
	endMs: `${number}`;
	snippet: D$TextWithRuns;
	startTimeText: G$Text;
	trackingParams: string;
	accessibility: A$Accessibility;
	targetId?: `${string}.${string}.${number}.${number}`;
};