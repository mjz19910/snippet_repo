//#region TA_
type TA_Continuation<T_TargetId,T_ItemType>={targetId: T_TargetId; continuationItems: T_ItemType[];};
type TA_CreateObjectFromContinuationMap<T>={[E in keyof T]: TA_Continuation<E,T[E]>}[keyof T];
//#endregion
//#region Action Templates
type TA_OpenPopup<T_Action>=TE_Endpoint_2<"openPopupAction",T_Action>;
//#endregion
//#region Actions 
type A_AccountItem=TE_Endpoint_1<"accountItem",AD_AccountItem>;
type A_AccountMenuPopup=TA_OpenPopup<Popup_AccountMenu>;
type A_AddChatItem=TE_Endpoint_2<"addChatItemAction",AD_AddChatItem>;
type A_AddToGuideSection=TE_Endpoint_2<"addToGuideSectionAction",AD_AddToGuideSection>;
type A_AddVideo={action: "ACTION_ADD_VIDEO"; addedVideoId?: string;};
type A_AppendContinuationItems=TE_Endpoint_2<"appendContinuationItemsAction",AD_AppendContinuationItems>;
type A_ChangeEngagementPanelVisibility=TE_Endpoint_2<"changeEngagementPanelVisibilityAction",AD_ChangeEngagementPanelVisibility>;
type A_ConfirmDialog=TA_OpenPopup<Popup_ConfirmDialog>;
type A_FancyDismissibleDialog=TA_OpenPopup<T_OpenPopup_Dialog<R_FancyDismissibleDialog>>;
type A_GetAccountMenu=TA_OpenPopup<Popup_GetAccountMenu>;
type A_GetMultiPageMenu=TE_Endpoint_1<"getMultiPageMenuAction",AD_GetMultiPageMenu>;
type A_GetNotificationsMenu=TA_OpenPopup<Popup_GetNotificationsMenu>;
type A_HideEnclosing=TE_Endpoint_2<"hideEnclosingAction",AD_HideEnclosing>;
type A_HideEngagementPanelScrim=TE_Endpoint_2<"hideEngagementPanelScrimAction",AD_HideEngagementPanelTargetId>;
type A_NotificationMenuPopup=TA_OpenPopup<Popup_NotificationMenu>;
type A_NotificationToast=TA_OpenPopup<Popup_NotificationToast>;
type A_PdgBuyFlow=TA_OpenPopup<R_PdgBuyFlow>;
type A_RemoveFromGuideSection=TE_Endpoint_2<"removeFromGuideSectionAction",AD_RemoveFromGuideSection>;
type A_ReplaceEnclosing=TE_Endpoint_2<"replaceEnclosingAction",AD_ReplaceEnclosing>;
type A_ReplayChatItem=TE_Endpoint_1<"replayChatItemAction",AD_ReplayChatItem>;
type A_SendFeedback=TE_Endpoint_2<"sendFeedbackAction",AD_SendFeedback>;
type A_SetActivePanelItem=TE_Endpoint_2<"setActivePanelItemAction",AD_SetActivePanelItem>;
type A_SetPlaylistVideoOrder={action: "ACTION_SET_PLAYLIST_VIDEO_ORDER";};
type A_ShareEntityService=TA_OpenPopup<Popup_ShareEntityService>;
type A_ShowEngagementPanelScrim=TE_Endpoint_2<"showEngagementPanelScrimAction",AD_ShowEngagementPanelScrim>;
type A_Signal=TE_Endpoint_2<"signalAction",AD_Signal>;
type A_UndoFeedback=TE_Endpoint_2<"undoFeedbackAction",B_Hack>;
type A_WatchNextContinuation=TA_Continuation<"watch-next-feed",G_WatchNext>;
type OP_ClientSignal=TA_OpenPopup<P_ClientSignal>;
type TA_OpenPopup_Empty=TA_OpenPopup<{}>;
//#region AU_
type AU_ChannelSwitcherPage={updateChannelSwitcherPageAction: AD_UpdateChannelSwitcherPage;};
type AU_DateText={updateDateTextAction: AD_DateText;};
type AU_Description={updateDescriptionAction: AD_Description;};
type AU_EngagementPanel={clickTrackingParams: string; updateEngagementPanelAction: AD_UpdateEngagementPanel;};
type AU_NotificationsUnseenCount={clickTrackingParams: string; updateNotificationsUnseenCountAction: AD_UpdateNotificationsUnseenCount;};
type AU_SubscribeButton={updateSubscribeButtonAction: AD_SubscribeButton;};
type AU_Title={updateTitleAction: AD_Title;};
type AU_ToggleButtonText={updateToggleButtonTextAction: AD_ToggleButtonText;};
type AU_Viewership={updateViewershipAction: AD_ViewCount;};
//#endregion
