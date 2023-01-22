type D__GuideEntry={
	navigationEndpoint: E_Browse;
	thumbnail: D__Thumbnail;
	badges: GuideEntryBadges;
	trackingParams: string;
	formattedTitle: R_SimpleText;
	accessibility: D__Accessibility;
	entryData: R_GuideEntryData;
	presentationStyle: "GUIDE_ENTRY_PRESENTATION_STYLE_NEW_CONTENT"|"GUIDE_ENTRY_PRESENTATION_STYLE_NONE";
}|{
	navigationEndpoint?: E_UrlEndpoint|E_Browse;
	icon: T$Icon<"EXPAND"|"ADD_CIRCLE">;
	trackingParams: string;
	formattedTitle: R_SimpleText;
	accessibility: D__Accessibility;
}|{
	navigationEndpoint: E_Browse;
	icon: T$Icon<"WHAT_TO_WATCH">;
	trackingParams: string;
	formattedTitle: R_SimpleText;
	accessibility: D__Accessibility;
	isPrimary: true;
}|{
	icon: T$Icon<"TAB_SHORTS">;
	trackingParams: string;
	formattedTitle: R_SimpleText;
	accessibility: D__Accessibility;
	serviceEndpoint: E_T$SignalService<{}>|E_ReelWatchEndpoint;
	isPrimary: true;
}|{
	icon: T$Icon<"HELP">;
	trackingParams: string;
	formattedTitle: R_SimpleText;
	accessibility: D__Accessibility;
	serviceEndpoint: E_T$SignalService<{}>;
}|{
	navigationEndpoint: E_Browse;
	icon: T$Icon<"VIDEO_LIBRARY_WHITE">;
	trackingParams: string;
	formattedTitle: R_SimpleText;
	accessibility: D__Accessibility;
	targetId: "library-guide-item";
	isPrimary: true;
};