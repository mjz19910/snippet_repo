type UMA_Item=[
	AU_DateText,
	AU_Description,
	AU_Title,
	AU_ToggleButtonText,
	AU_Viewership,
][number];
type AU_ChannelSwitcherPage={updateChannelSwitcherPageAction: AD_UpdateChannelSwitcherPage;};
type AU_DateText={updateDateTextAction: AD_DateText;};
type AU_Description={updateDescriptionAction: AD_Description;};
type AU_EngagementPanel={clickTrackingParams: string; updateEngagementPanelAction: AD_UpdateEngagementPanel;};
type AU_NotificationsUnseenCount={clickTrackingParams: string; updateNotificationsUnseenCountAction: AD_UpdateNotificationsUnseenCount;};
type AU_SubscribeButton={updateSubscribeButtonAction: AD_SubscribeButton;};
type AU_Title={updateTitleAction: AD_Title;};
type AU_ToggleButtonText={updateToggleButtonTextAction: AD_ToggleButtonText;};
type AU_Viewership={updateViewershipAction: AD_ViewCount;};
