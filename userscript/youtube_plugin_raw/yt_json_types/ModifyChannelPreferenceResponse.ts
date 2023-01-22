type ModifyChannelPreferenceResponse={
	responseContext: RC$ResponseContext;
	actions: A$OpenPopup[];
	channelId: `UC${string}`;
	newNotificationButton: SubscriptionNotificationToggleButtonRenderer;
	trackingParams: string;
	frameworkUpdates: EntityBatchUpdate;
};