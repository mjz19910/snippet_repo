type RS_Unsubscribe={
	responseContext: RC_ResponseContext;
	actions: (A_RemoveFromGuideSection|TA_OpenPopup_Empty|AU_SubscribeButton)[];
	trackingParams: string;
	frameworkUpdates: A_FrameworkUpdates;
};