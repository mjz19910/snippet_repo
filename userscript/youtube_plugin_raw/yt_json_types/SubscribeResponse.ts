type SubscribeResponse={
	responseContext: RC$ResponseContext;
	actions: (A$AddToGuideSection|T$A$OpenPopup<{}>|C$RunAttestation|A$UpdateSubscribeButton)[];
	newNotificationButton: {};
	trackingParams: string;
	frameworkUpdates: A$FrameworkUpdates;
};