type R$ModifyChannelPreference={
	responseContext: RC$ResponseContext;
	actions: T$A_OpenPopup<{}>[];
	channelId: `UC${string}`;
	newNotificationButton: R$SubscriptionNotificationToggleButton;
	trackingParams: string;
	frameworkUpdates: R$EntityBatchUpdate;
};