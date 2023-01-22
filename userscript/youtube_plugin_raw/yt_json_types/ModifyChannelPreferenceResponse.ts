type ModifyChannelPreferenceResponse={
	responseContext: RC$ResponseContext;
	actions: T$OpenPopup<{}>[];
	channelId: `UC${string}`;
	newNotificationButton: SubscriptionNotificationToggleButtonRenderer;
	trackingParams: string;
	frameworkUpdates: EntityBatchUpdate;
};