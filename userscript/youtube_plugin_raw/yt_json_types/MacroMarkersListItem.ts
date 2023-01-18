type MacroMarkersListItem={
	title: SimpleText;
	timeDescription: SimpleText;
	thumbnail: Thumbnail;
	onTap: WatchEndpoint;
	trackingParams: string;
	shareButton: ButtonRenderer;
	repeatButton: ToggleButtonRenderer;
	macroMarkerRepeatStateEntityKey: string;
	endRepeatCommand: CommandExecutorCommand;
	playerStateEntityKey: string;
	carouselType: "MACRO_MARKERS_LIST_ITEM_RENDERER_CAROUSEL_TYPE_DEFAULT";
	lightColorPalette: LightColorPalette;
	darkColorPalette: DarkColorPalette;
	timeDescriptionA11yLabel: `${number} seconds`;
}|{
	title: SimpleText;
	timeDescription: SimpleText;
	thumbnail: Thumbnail;
	onTap: WatchEndpoint;
	trackingParams: string;
	layout: "MACRO_MARKERS_LIST_ITEM_RENDERER_LAYOUT_VERTICAL";
	carouselType: "MACRO_MARKERS_LIST_ITEM_RENDERER_CAROUSEL_TYPE_DEFAULT";
};