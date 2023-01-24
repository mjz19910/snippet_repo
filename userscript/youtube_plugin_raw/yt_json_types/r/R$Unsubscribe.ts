type RS_Unsubscribe={
	responseContext: RC$ResponseContext;
	actions: (A_RemoveFromGuideSection|TA_OpenPopup<{}>|A_UpdateSubscribeButton)[];
	trackingParams: string;
	frameworkUpdates: A_FrameworkUpdates;
};