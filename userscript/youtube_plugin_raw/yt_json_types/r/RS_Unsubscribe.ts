type RS_Unsubscribe={
	responseContext: RC_ResponseContext;
	actions: (A_RemoveFromGuideSection|TA_OpenPopup<{}>|AU_SubscribeButton)[];
	trackingParams: string;
	frameworkUpdates: A_FrameworkUpdates;
};