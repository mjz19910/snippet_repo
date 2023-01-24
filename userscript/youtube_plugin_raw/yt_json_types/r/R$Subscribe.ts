type RS_Subscribe={
	responseContext: RC$ResponseContext;
	actions: (A_AddToGuideSection|TA_OpenPopup<{}>|C_RunAttestation|A_UpdateSubscribeButton)[];
	newNotificationButton: {};
	trackingParams: string;
	frameworkUpdates: A_FrameworkUpdates;
};