type GuideEntryRoot={
	navigationEndpoint: E$BrowseEndpoint;
	thumbnail: D$Thumbnail;
	badges: GuideEntryBadges;
	trackingParams: string;
	formattedTitle: D$SimpleText;
	accessibility: A$Accessibility;
	entryData: D$GuideEntry;
	presentationStyle: "GUIDE_ENTRY_PRESENTATION_STYLE_NEW_CONTENT"|"GUIDE_ENTRY_PRESENTATION_STYLE_NONE";
}|{
	navigationEndpoint?: E$UrlEndpoint|E$BrowseEndpoint;
	icon: T$Icon<"EXPAND"|"ADD_CIRCLE">;
	trackingParams: string;
	formattedTitle: D$SimpleText;
	accessibility: A$Accessibility;
}|{
	navigationEndpoint: E$BrowseEndpoint;
	icon: T$Icon<"WHAT_TO_WATCH">;
	trackingParams: string;
	formattedTitle: D$SimpleText;
	accessibility: A$Accessibility;
	isPrimary: true;
}|{
	icon: T$Icon<"TAB_SHORTS">;
	trackingParams: string;
	formattedTitle: D$SimpleText;
	accessibility: A$Accessibility;
	serviceEndpoint: E$SignalServiceEndpoint|E$ReelWatchEndpoint;
	isPrimary: true;
}|{
	icon: T$Icon<"HELP">;
	trackingParams: string;
	formattedTitle: D$SimpleText;
	accessibility: A$Accessibility;
	serviceEndpoint: E$SignalServiceEndpoint;
}|{
	navigationEndpoint: E$BrowseEndpoint;
	icon: T$Icon<"VIDEO_LIBRARY_WHITE">;
	trackingParams: string;
	formattedTitle: D$SimpleText;
	accessibility: A$Accessibility;
	targetId: "library-guide-item";
	isPrimary: true;
};