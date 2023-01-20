type GuideEntryRoot={
	navigationEndpoint: E_BrowseEndpoint;
	thumbnail: Thumbnail;
	badges: GuideEntryBadges;
	trackingParams: string;
	formattedTitle: SimpleText;
	accessibility: Accessibility;
	entryData: GuideEntryData;
	presentationStyle: "GUIDE_ENTRY_PRESENTATION_STYLE_NEW_CONTENT"|"GUIDE_ENTRY_PRESENTATION_STYLE_NONE";
}|{
	navigationEndpoint?: E_UrlEndpoint|E_BrowseEndpoint;
	icon: Icon<"EXPAND"|"ADD_CIRCLE">;
	trackingParams: string;
	formattedTitle: SimpleText;
	accessibility: Accessibility;
}|{
	navigationEndpoint: E_BrowseEndpoint;
	icon: Icon<"WHAT_TO_WATCH">;
	trackingParams: string;
	formattedTitle: SimpleText;
	accessibility: Accessibility;
	isPrimary: true;
}|{
	icon: Icon<"TAB_SHORTS">;
	trackingParams: string;
	formattedTitle: SimpleText;
	accessibility: Accessibility;
	serviceEndpoint: E_SignalServiceEndpoint|E_ReelWatchEndpoint;
	isPrimary: true;
};