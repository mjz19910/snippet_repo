type ToggleButtonRenderer={
	toggleButtonRenderer: Accessibility;
};

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
	lightColorPalette: {
		section1Color: 4294966779;
		section2Color: 4294505969;
		section3Color: 4294110695;
		primaryTitleColor: 4279833872;
		secondaryTitleColor: 4285554760;
		section4Color: 4293650141;
	};
	darkColorPalette: {
		section1Color: 4281871903;
		section2Color: 4280819991;
		section3Color: 4279833614;
		primaryTitleColor: 4294964453;
		secondaryTitleColor: 4291607459;
		section4Color: 4278979079;
	};
	timeDescriptionA11yLabel: "0 seconds";
};

type MacroMarkersListItemRenderer={
	macroMarkersListItemRenderer: MacroMarkersListItem;
};

type MacroMarkersList={
	contents: MacroMarkersListItemRenderer[];
	syncButtonLabel: TextWithRuns;
	trackingParams: string;
};

type MacroMarkersListRenderer={
	macroMarkersListRenderer: MacroMarkersList;
};
