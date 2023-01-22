type D_MusicShelf=T$AR_Contents<R_MusicResponsiveListItem>&{
	title: R_TextWithRuns;
	trackingParams: string;
	continuations: D_ReloadContinuation[];
	shelfDivider: R_MusicShelfDivider;
	autoReloadWhenEmpty: true;
	bottomButton: R_Button;
};