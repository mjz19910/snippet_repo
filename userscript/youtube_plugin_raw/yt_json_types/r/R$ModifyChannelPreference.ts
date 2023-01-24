type RSM_ChannelPreference={
	responseContext: RC$ResponseContext;
	actions: TA_OpenPopup<{}>[];
	channelId: `UC${string}`;
	newNotificationButton: R_SubscriptionNotificationToggleButton;
	trackingParams: string;
	frameworkUpdates: R_EntityBatchUpdate;
};