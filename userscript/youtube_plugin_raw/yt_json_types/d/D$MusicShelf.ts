type D_MusicShelf=Record<"contents",R_MusicResponsiveListItem[]>&{
	title: R_TextRuns;
	trackingParams: string;
	continuations: CD_Reload[];
	shelfDivider: R_MusicShelfDivider;
	autoReloadWhenEmpty: true;
	bottomButton: R_Button;
};