type MusicShelf=ContentsArrayTemplate<MusicResponsiveListItemRenderer>&{
	title: D$TextWithRuns;
	trackingParams: string;
	continuations: ReloadContinuationData[];
	shelfDivider: MusicShelfDividerRenderer;
	autoReloadWhenEmpty: true;
	bottomButton: R$ButtonRenderer;
};