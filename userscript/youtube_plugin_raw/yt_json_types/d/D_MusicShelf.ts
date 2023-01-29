type D_MusicShelf=Record<"contents",R_MusicResponsiveListItem[]>&{
	title: D_Text;
	trackingParams: string;
	continuations: CD_Reload[];
	shelfDivider: R_MusicShelfDivider;
	autoReloadWhenEmpty: true;
	bottomButton: R_Button;
};