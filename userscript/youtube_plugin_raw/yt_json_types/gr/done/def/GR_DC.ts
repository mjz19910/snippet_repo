//#region Common data
type DC_Empty_WCM={webCommandMetadata: {};};
type DC_Params={params: string;};
type DC_Generic_CTP={continuation: string; clickTrackingParams: string;};
//#endregion
//#region ContinuationData
type DC_ResetChannelUnreadCount={};
type DC_LoadMarkers={entityKeys: string[];};
type DC_ShowReloadUi={targetId: D_UiTargetId;};
type DC_Loop={loop: false;};
type DC_RepeatChapter={
	repeat: "REPEAT_CHAPTER_TYPE_ENABLE_REPEAT";
	startTimeMs: "0";
	endTimeMs: "60000";
	repeatStateEntityKey: string;
};
type DC_ReloadContinuationItems={
	slot: "RELOAD_CONTINUATION_SLOT_BODY";
	targetId: "browse-feedFEwhat_to_watch";
	continuationItems: G_SectionItem[];
}|{
	slot: "RELOAD_CONTINUATION_SLOT_HEADER";
	targetId: "comments-section";
	continuationItems: R_CommentsHeader[];
};
//#endregion
