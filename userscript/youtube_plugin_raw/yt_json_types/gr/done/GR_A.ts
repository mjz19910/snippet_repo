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
type AU_ChannelSwitcherPage={updateChannelSwitcherPageAction: AD_UpdateChannelSwitcherPage;};
type AU_DateText={updateDateTextAction: D_DateText;};
type AU_Description={updateDescriptionAction: DUA_Description;};
type AU_EngagementPanel={clickTrackingParams: string; updateEngagementPanelAction: AD_UpdateEngagementPanel;};
type AU_NotificationsUnseenCount={clickTrackingParams: string; updateNotificationsUnseenCountAction: AD_UpdateNotificationsUnseenCount;};
type AU_SubscribeButton={updateSubscribeButtonAction: DAU_SubscribeButton;};
type AU_Title={updateTitleAction: D_Title;};type U_ToggleButtonText={updateToggleButtonTextAction: D_ToggleButtonText;};
type AU_Viewership={updateViewershipAction: D_ViewCount;};
//#endregion
