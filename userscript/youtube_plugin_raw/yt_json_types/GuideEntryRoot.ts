type GuideEntryRoot={
	navigationEndpoint: BrowseEndpoint;
	thumbnail: Thumbnail;
	badges: GuideEntryBadges;
	trackingParams: string;
	formattedTitle: SimpleText;
	accessibility: Accessibility;
	entryData: GuideEntryData;
	presentationStyle: "GUIDE_ENTRY_PRESENTATION_STYLE_NEW_CONTENT";
}|{
	icon: Icon<"EXPAND">;
	trackingParams: string;
	formattedTitle: SimpleText;
	accessibility: Accessibility;
};