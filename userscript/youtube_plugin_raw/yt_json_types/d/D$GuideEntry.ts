type D$GuideEntry={
	navigationEndpoint: E$Browse;
	thumbnail: D$Thumbnail;
	badges: GuideEntryBadges;
	trackingParams: string;
	formattedTitle: R$SimpleText;
	accessibility: D$Accessibility;
	entryData: R$GuideEntryData;
	presentationStyle: "GUIDE_ENTRY_PRESENTATION_STYLE_NEW_CONTENT"|"GUIDE_ENTRY_PRESENTATION_STYLE_NONE";
}|{
	navigationEndpoint?: E$UrlEndpoint|E$Browse;
	icon: T$Icon<"EXPAND"|"ADD_CIRCLE">;
	trackingParams: string;
	formattedTitle: R$SimpleText;
	accessibility: D$Accessibility;
}|{
	navigationEndpoint: E$Browse;
	icon: T$Icon<"WHAT_TO_WATCH">;
	trackingParams: string;
	formattedTitle: R$SimpleText;
	accessibility: D$Accessibility;
	isPrimary: true;
}|{
	icon: T$Icon<"TAB_SHORTS">;
	trackingParams: string;
	formattedTitle: R$SimpleText;
	accessibility: D$Accessibility;
	serviceEndpoint: E$T$SignalService<{}>|E$ReelWatchEndpoint;
	isPrimary: true;
}|{
	icon: T$Icon<"HELP">;
	trackingParams: string;
	formattedTitle: R$SimpleText;
	accessibility: D$Accessibility;
	serviceEndpoint: E$T$SignalService<{}>;
}|{
	navigationEndpoint: E$Browse;
	icon: T$Icon<"VIDEO_LIBRARY_WHITE">;
	trackingParams: string;
	formattedTitle: R$SimpleText;
	accessibility: D$Accessibility;
	targetId: "library-guide-item";
	isPrimary: true;
};