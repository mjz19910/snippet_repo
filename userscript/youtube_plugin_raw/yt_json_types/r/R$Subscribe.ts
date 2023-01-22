type R_Subscribe={
	responseContext: RC$ResponseContext;
	actions: (A_AddToGuideSection|T$A_OpenPopup<{}>|C$RunAttestation|A_UpdateSubscribeButton)[];
	newNotificationButton: {};
	trackingParams: string;
	frameworkUpdates: A_FrameworkUpdates;
};