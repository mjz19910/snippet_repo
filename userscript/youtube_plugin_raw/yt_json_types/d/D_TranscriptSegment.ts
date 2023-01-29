type D_TranscriptSegment={
	startMs: `${number}`;
	endMs: `${number}`;
	snippet: D_Text;
	startTimeText: D_Text;
	trackingParams: string;
	accessibility: D_Accessibility;
	targetId?: `${string}.${string}.${number}.${number}`;
};