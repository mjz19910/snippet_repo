type MusicShelf=ContentsArrayTemplate<MusicResponsiveListItemRenderer>&{
	title: TextWithRuns;
	trackingParams: string;
	continuations: ReloadContinuationData[];
	shelfDivider: MusicShelfDividerRenderer;
	autoReloadWhenEmpty: true;
	bottomButton: R$Button;
};