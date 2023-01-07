type GuideCollapsibleSectionEntry={
	headerEntry: GuideEntryRenderer;
	expanderIcon: Icon<"EXPAND">;
	collapserIcon: Icon<"COLLAPSE">;
	sectionItems: {}[];
	handlerDatas: ["GUIDE_ACTION_ADD_TO_PLAYLISTS","GUIDE_ACTION_REMOVE_FROM_PLAYLISTS"];
};