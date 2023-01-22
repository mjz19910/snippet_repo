type D__MusicShelf=T$AR_Contents<R_MusicResponsiveListItem>&{
	title: R_TextWithRuns;
	trackingParams: string;
	continuations: D__ReloadContinuation[];
	shelfDivider: R_MusicShelfDivider;
	autoReloadWhenEmpty: true;
	bottomButton: R_Button;
};