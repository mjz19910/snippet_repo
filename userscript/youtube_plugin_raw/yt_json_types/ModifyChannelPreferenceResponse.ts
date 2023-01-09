type ModifyChannelPreferenceResponse={
	responseContext: ResponseContext;
	actions: OpenPopupAction[];
	channelId: `UC${string}`;
	newNotificationButton: SubscriptionNotificationToggleButtonRenderer;
	trackingParams: string;
	frameworkUpdates: EntityBatchUpdate;
};