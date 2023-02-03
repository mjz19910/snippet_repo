//#region Action data
type AD_AddChatItem={item: G_ChatItem; clientId?: string;};
type AD_AddToGuideSection=T_Items<R_GuideEntry>&{handlerData: D_Enum_GuideAction;};
type AD_AppendContinuationItems=TA_CreateObjectFromContinuationMap<TB_ContinuationItemMap>;
type AD_ChangeEngagementPanelVisibility={targetId: D_EngagementPanelTargetId; visibility: D_EngagementPanelVisibility;};
type AD_GetMultiPageMenu=T_Menu<TR_MultiPageMenu_Empty>;
type AD_HideEnclosing={notificationId: `${number}`;};
type AD_HideEngagementPanelTargetId={engagementPanelTargetId: "engagement-panel-clip-create";};
type AD_RemoveFromGuideSection={handlerData: "GUIDE_ACTION_REMOVE_FROM_PLAYLISTS"; guideEntryId: T_MixPlaylistStr;};
type AD_ReplaceEnclosing_Item=R_NotificationText|RA_ReelDismissal|R_NotificationMultiAction;
type AD_ReplaceEnclosing=T_Item<AD_ReplaceEnclosing_Item>;
type AD_ReplayChatItem={actions: A_AddChatItem[]; videoOffsetTimeMsec: `${number}`;};
type AD_SendFeedback={bucket: "Kevlar";};
type AD_SetActivePanelItem={};
type AD_ShowEngagementPanelScrim={engagementPanelTargetId: "engagement-panel-clip-create"; onClickCommands: TA_OpenPopup<Popup_ConfirmDialog>[];};
type AD_Signal={signal: DU_SignalStr;};
type AD_UndoFeedback=B_Hack;
type AD_UpdateChannelSwitcherPage=T_Page<R_ChannelSwitcherPage>;
type AD_UpdateEngagementPanel={targetId: "engagement-panel-searchable-transcript"; content: R_Transcript;};
type AD_UpdateNotificationsUnseenCount={handlerData: "NOTIFICATION_ACTION_UPDATE_UNSEEN_COUNT"; unseenCount: number; timeoutMs: number;};
//#endregion
type AD_ReelDismissal={onDismissalCompletionRenderer: RA_NotificationAction; trackingParams: string;};
type AD_Notification={trackingParams: string; responseText: G_Text; actionButton?: R_Button;};
type AD_AccountItem={
	accountName: G_Text;
	accountPhoto: D_Thumbnail;
	isSelected: boolean;
	isDisabled: boolean;
	hasChannel: boolean;
	serviceEndpoint: {};
	accountByline: G_Text;
	channelHandle: G_Text;
};
