//#region TA_
type TA_Continuation<T_TargetId,T_ItemType>={targetId: T_TargetId; continuationItems: T_ItemType[];};
type TA_CreateObjectFromContinuationMap<T>={[E in keyof T]: TA_Continuation<E,T[E]>}[keyof T];
//#endregion
//#region Action Templates
type TA_OpenPopup<T_Action>={clickTrackingParams: string; openPopupAction: T_Action;};
//#endregion
//#region Actions 
type A_AddChatItem={clickTrackingParams: string;addChatItemAction: DA_AddChatItem;};
type A_AddToGuideSection={clickTrackingParams: string; addToGuideSectionAction: AD_AddToGuideSection;};
type A_AppendContinuationItems={clickTrackingParams: string; appendContinuationItemsAction: AD_AppendContinuationItems;};
type A_ChangeEngagementPanelVisibility={clickTrackingParams: string; changeEngagementPanelVisibilityAction: AD_ChangeEngagementPanelVisibility;};
type A_GetMultiPageMenu={getMultiPageMenuAction: AD_GetMultiPageMenu;};
type A_HideEnclosing={clickTrackingParams: string; hideEnclosingAction: AD_HideEnclosing;};
type A_HideEngagementPanelScrim={clickTrackingParams: string; hideEngagementPanelScrimAction: AD_HideEngagementPanelTargetId;};
type A_RemoveFromGuideSection={clickTrackingParams: string; removeFromGuideSectionAction: AD_RemoveFromGuideSection;};
type A_ReplaceEnclosing={clickTrackingParams: string; replaceEnclosingAction: AD_ReplaceEnclosing;};
type A_ReplayChatItem={replayChatItemAction: DA_ReplayChatItem;};
type A_SendFeedback={clickTrackingParams: string; sendFeedbackAction: AD_SendFeedback;};
type A_SetActivePanelItem={clickTrackingParams: string; setActivePanelItemAction: AD_SetActivePanelItem;};
type A_ShowEngagementPanelScrim={clickTrackingParams: string; showEngagementPanelScrimAction: AD_ShowEngagementPanelScrim;};
type A_Signal={clickTrackingParams: string; signalAction: AD_Signal;};
type A_UndoFeedback={clickTrackingParams: string; undoFeedbackAction: AD_UndoFeedback;};
type A_AccountItem={accountItem: AD_AccountItem;};
//#endregion
type AC_Executor=[
	A_ChangeEngagementPanelVisibility,
	A_HideEngagementPanelScrim,
	C_ScrollToEngagementPanel,
	C_Loop,
	C_UpdateToggleButtonState,
	TA_OpenPopup_Empty
][number];
type A_ActionAddVideo={
	addedVideoId: string;
	action: "ACTION_ADD_VIDEO";
};
type A_ActionSetPlaylistVideoOrder={
	action: "ACTION_SET_PLAYLIST_VIDEO_ORDER";
};
type A_BrowserMediaSession={browserMediaSession: R_BrowserMediaSession;}&T_Actions<R_LikeButton>;
type A_ExternalChannelId={
	externalChannelId: `UC${string}`;
};
type A_FrameworkUpdates={
	entityBatchUpdate: D_EntityBatchUpdate;
	elementUpdate?: R_ElementUpdate;
};
type D_LoggingDirectives={
	trackingParams: string;
	visibility: TM_Visibility;
	enableDisplayloggerExperiment?: boolean;
	gestures?: D_LoggingDirectives_Gestures;
};
type A_ResponseReceived=
	|C_AdsControlFlowOpportunityReceived
	|C_ReloadContinuationItems;
type A_WatchNextContinuation=TA_Continuation<"watch-next-feed",G_WatchNext>;
