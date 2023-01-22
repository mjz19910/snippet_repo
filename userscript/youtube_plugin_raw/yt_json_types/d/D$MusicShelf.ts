type D$MusicShelf=T$AR$Contents<R$MusicResponsiveListItem>&{
	title: R$TextWithRuns;
	trackingParams: string;
	continuations: D$ReloadContinuation[];
	shelfDivider: R$MusicShelfDivider;
	autoReloadWhenEmpty: true;
	bottomButton: R$Button;
};