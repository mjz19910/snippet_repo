type GuideEntryRoot={
	navigationEndpoint: E$BrowseEndpoint;
	thumbnail: D$Thumbnail;
	badges: GuideEntryBadges;
	trackingParams: string;
	formattedTitle: D$SimpleText;
	accessibility: A$Accessibility;
	entryData: GuideEntryData;
	presentationStyle: "GUIDE_ENTRY_PRESENTATION_STYLE_NEW_CONTENT"|"GUIDE_ENTRY_PRESENTATION_STYLE_NONE";
}|{
	navigationEndpoint?: E$UrlEndpoint|E$BrowseEndpoint;
	icon: Icon<"EXPAND"|"ADD_CIRCLE">;
	trackingParams: string;
	formattedTitle: D$SimpleText;
	accessibility: A$Accessibility;
}|{
	navigationEndpoint: E$BrowseEndpoint;
	icon: Icon<"WHAT_TO_WATCH">;
	trackingParams: string;
	formattedTitle: D$SimpleText;
	accessibility: A$Accessibility;
	isPrimary: true;
}|{
	icon: Icon<"TAB_SHORTS">;
	trackingParams: string;
	formattedTitle: D$SimpleText;
	accessibility: A$Accessibility;
	serviceEndpoint: E$SignalServiceEndpoint|E$ReelWatchEndpoint;
	isPrimary: true;
}|{
	icon: Icon<"HELP">;
	trackingParams: string;
	formattedTitle: D$SimpleText;
	accessibility: A$Accessibility;
	serviceEndpoint: E$SignalServiceEndpoint;
};