type MusicShelf=T$AR$Contents<R$MusicResponsiveListItem>&{
	title: D$TextWithRuns;
	trackingParams: string;
	continuations: ReloadContinuationData[];
	shelfDivider: R$MusicShelfDivider;
	autoReloadWhenEmpty: true;
	bottomButton: R$Button;
};