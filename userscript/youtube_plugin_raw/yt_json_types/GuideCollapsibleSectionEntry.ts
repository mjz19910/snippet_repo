type GuideCollapsibleSectionEntry={
	headerEntry: GuideEntryRenderer;
	expanderIcon: T$Icon<"EXPAND">;
	collapserIcon: T$Icon<"COLLAPSE">;
	sectionItems: {}[];
	handlerDatas: ["GUIDE_ACTION_ADD_TO_PLAYLISTS","GUIDE_ACTION_REMOVE_FROM_PLAYLISTS"];
};