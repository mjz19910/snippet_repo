type GuideEntryRoot={
	navigationEndpoint: BrowseEndpoint;
	thumbnail: Thumbnail;
	badges: GuideEntryBadges;
	trackingParams: string;
	formattedTitle: SimpleText;
	accessibility: Accessibility;
	entryData: GuideEntryData;
	presentationStyle: "GUIDE_ENTRY_PRESENTATION_STYLE_NEW_CONTENT"|"GUIDE_ENTRY_PRESENTATION_STYLE_NONE";
}|{
	navigationEndpoint?: BrowseEndpoint;
	icon: Icon<"EXPAND"|"ADD_CIRCLE">;
	trackingParams: string;
	formattedTitle: SimpleText;
	accessibility: Accessibility;
};