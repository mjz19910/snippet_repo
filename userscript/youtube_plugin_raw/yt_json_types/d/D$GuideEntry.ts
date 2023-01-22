type D_GuideEntry={
	navigationEndpoint: E_Browse;
	thumbnail: D_Thumbnail;
	badges: GuideEntryBadges;
	trackingParams: string;
	formattedTitle: R_SimpleText;
	accessibility: D_Accessibility;
	entryData: R_GuideEntryData;
	presentationStyle: "GUIDE_ENTRY_PRESENTATION_STYLE_NEW_CONTENT"|"GUIDE_ENTRY_PRESENTATION_STYLE_NONE";
}|{
	navigationEndpoint?: E_Url|E_Browse;
	icon: T_Icon<"EXPAND"|"ADD_CIRCLE">;
	trackingParams: string;
	formattedTitle: R_SimpleText;
	accessibility: D_Accessibility;
}|{
	navigationEndpoint: E_Browse;
	icon: T_Icon<"WHAT_TO_WATCH">;
	trackingParams: string;
	formattedTitle: R_SimpleText;
	accessibility: D_Accessibility;
	isPrimary: true;
}|{
	icon: T_Icon<"TAB_SHORTS">;
	trackingParams: string;
	formattedTitle: R_SimpleText;
	accessibility: D_Accessibility;
	serviceEndpoint: E_T$SignalService<{}>|E_ReelWatch;
	isPrimary: true;
}|{
	icon: T_Icon<"HELP">;
	trackingParams: string;
	formattedTitle: R_SimpleText;
	accessibility: D_Accessibility;
	serviceEndpoint: E_T$SignalService<{}>;
}|{
	navigationEndpoint: E_Browse;
	icon: T_Icon<"VIDEO_LIBRARY_WHITE">;
	trackingParams: string;
	formattedTitle: R_SimpleText;
	accessibility: D_Accessibility;
	targetId: "library-guide-item";
	isPrimary: true;
};