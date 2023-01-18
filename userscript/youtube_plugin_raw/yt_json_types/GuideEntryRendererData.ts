type GuideEntry={
	navigationEndpoint: BrowseEndpoint;
	thumbnail: Thumbnail;
	badges: GuideEntryBadges;
	trackingParams: string;
	formattedTitle: SimpleText;
	accessibility: AccessibilityData;
	entryData: GuideEntryData;
	presentationStyle: string;
};