type UMA_Item=[
	UA_DateText,
	UA_Description,
	UA_Title,
	UA_ToggleButtonText,
	UA_Viewership,
][number];
type UA_ChannelSwitcherPage={updateChannelSwitcherPageAction: AD_UpdateChannelSwitcherPage;};
type UA_DateText={updateDateTextAction: AD_DateText;};
type UA_Description={updateDescriptionAction: AD_Description;};
type UA_EngagementPanel={clickTrackingParams: string; updateEngagementPanelAction: AD_UpdateEngagementPanel;};
type UA_NotificationsUnseenCount={clickTrackingParams: string; updateNotificationsUnseenCountAction: AD_UpdateNotificationsUnseenCount;};
type UA_SubscribeButton={updateSubscribeButtonAction: AD_SubscribeButton;};
type UA_Title={updateTitleAction: AD_Title;};
type UA_ToggleButtonText={updateToggleButtonTextAction: AD_ToggleButtonText;};
type UA_Viewership={updateViewershipAction: AD_ViewCount;};
