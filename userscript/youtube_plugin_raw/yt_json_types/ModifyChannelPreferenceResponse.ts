type ModifyChannelPreferenceResponse={
	responseContext: RC$ResponseContext;
	actions: T$A$OpenPopup<{}>[];
	channelId: `UC${string}`;
	newNotificationButton: SubscriptionNotificationToggleButtonRenderer;
	trackingParams: string;
	frameworkUpdates: R$EntityBatchUpdate;
};