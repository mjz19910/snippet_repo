type D__MacroMarkersListItem={
	title: R_SimpleText;
	timeDescription: R_SimpleText;
	thumbnail: D__Thumbnail;
	onTap: E_WatchEndpoint;
	trackingParams: string;
	shareButton: R_Button;
	repeatButton: R_ToggleButton;
	macroMarkerRepeatStateEntityKey: string;
	endRepeatCommand: E_CommandExecutorCommand;
	playerStateEntityKey: string;
	carouselType: "MACRO_MARKERS_LIST_ITEM_RENDERER_CAROUSEL_TYPE_DEFAULT";
	lightColorPalette: LightColorPalette;
	darkColorPalette: DarkColorPalette;
	timeDescriptionA11yLabel: `${number} seconds`;
}|{
	title: R_SimpleText;
	timeDescription: R_SimpleText;
	thumbnail: D__Thumbnail;
	onTap: E_WatchEndpoint;
	trackingParams: string;
	layout: "MACRO_MARKERS_LIST_ITEM_RENDERER_LAYOUT_VERTICAL";
	carouselType: "MACRO_MARKERS_LIST_ITEM_RENDERER_CAROUSEL_TYPE_DEFAULT";
};