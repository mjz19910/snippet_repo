type D$TranscriptSegment={
	startMs: `${number}`;
	endMs: `${number}`;
	snippet: R$TextWithRuns;
	startTimeText: G$Text;
	trackingParams: string;
	accessibility: A$Accessibility;
	targetId?: `${string}.${string}.${number}.${number}`;
};