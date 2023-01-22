type R_ModifyChannelPreference={
	responseContext: RC$ResponseContext;
	actions: T$A_OpenPopup<{}>[];
	channelId: `UC${string}`;
	newNotificationButton: R_SubscriptionNotificationToggleButton;
	trackingParams: string;
	frameworkUpdates: R_EntityBatchUpdate;
};