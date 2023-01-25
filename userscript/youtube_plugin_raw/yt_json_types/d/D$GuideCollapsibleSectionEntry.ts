type D_GuideCollapsibleSectionEntry={
	headerEntry: R_GuideEntry;
	expanderIcon: T_Icon<"EXPAND">;
	collapserIcon: T_Icon<"COLLAPSE">;
	sectionItems: G_GuideSectionItem[];
	handlerDatas: ["GUIDE_ACTION_ADD_TO_PLAYLISTS","GUIDE_ACTION_REMOVE_FROM_PLAYLISTS"];
};