type UMA_Item=[
	UA_DateText,
	UA_Description,
	UA_Title,
	UA_ToggleButtonText,
	UA_Viewership,
][number];
type UA_ChannelSwitcherPage={updateChannelSwitcherPageAction: AD_UpdateChannelSwitcherPage;};
type UA_DateText={updateDateTextAction: D_DateText;};
type UA_Description={updateDescriptionAction: DUA_Description;};
type UA_EngagementPanel={clickTrackingParams: string; updateEngagementPanelAction: AD_UpdateEngagementPanel;};
type A_UpdateNotificationsUnseenCount={clickTrackingParams: string; updateNotificationsUnseenCountAction: AD_UpdateNotificationsUnseenCount;};
type UA_SubscribeButton={updateSubscribeButtonAction: DUA_SubscribeButton;};
type UA_Title={updateTitleAction: D_Title;};
type UA_ToggleButtonText={updateToggleButtonTextAction: D_ToggleButtonText;};
type UA_Viewership={updateViewershipAction: D_ViewCount;};
