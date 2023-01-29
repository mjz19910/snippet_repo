type D_MacroMarkersListItem={
	title: D_Text;
	timeDescription: D_Text;
	thumbnail: R_Thumbnail;
	onTap: E_Watch;
	trackingParams: string;
	shareButton: R_Button;
	repeatButton: R_ToggleButton;
	macroMarkerRepeatStateEntityKey: string;
	endRepeatCommand: C_Executor;
	playerStateEntityKey: string;
	carouselType: "MACRO_MARKERS_LIST_ITEM_RENDERER_CAROUSEL_TYPE_DEFAULT";
	lightColorPalette: D_LightColorPalette;
	darkColorPalette: D$DarkColorPalette;
	timeDescriptionA11yLabel: `${number} seconds`;
}|{
	title: D_Text;
	timeDescription: D_Text;
	thumbnail: R_Thumbnail;
	onTap: E_Watch;
	trackingParams: string;
	layout: "MACRO_MARKERS_LIST_ITEM_RENDERER_LAYOUT_VERTICAL";
	carouselType: "MACRO_MARKERS_LIST_ITEM_RENDERER_CAROUSEL_TYPE_DEFAULT";
};