type RSM_ChannelPreference={
	responseContext: RC_ResponseContext;
	actions: TA_OpenPopup_Empty[];
	channelId: `UC${string}`;
	newNotificationButton: R_SubscriptionNotificationToggleButton;
	trackingParams: string;
	frameworkUpdates: R_EntityBatchUpdate;
};