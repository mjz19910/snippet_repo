type MusicShelf=T$AR$Contents<MusicResponsiveListItemRenderer>&{
	title: D$TextWithRuns;
	trackingParams: string;
	continuations: ReloadContinuationData[];
	shelfDivider: MusicShelfDividerRenderer;
	autoReloadWhenEmpty: true;
	bottomButton: R$Button;
};