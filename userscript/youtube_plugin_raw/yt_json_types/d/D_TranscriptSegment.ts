type D_TranscriptSegment={
	startMs: `${number}`;
	endMs: `${number}`;
	snippet: R_TextWithRuns;
	startTimeText: G_Text;
	trackingParams: string;
	accessibility: D_Accessibility;
	targetId?: `${string}.${string}.${number}.${number}`;
};