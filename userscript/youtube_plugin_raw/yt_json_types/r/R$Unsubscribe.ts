type R$Unsubscribe={
	responseContext: RC$ResponseContext;
	actions: (A_RemoveFromGuideSection|T$A_OpenPopup<{}>|A_UpdateSubscribeButton)[];
	trackingParams: string;
	frameworkUpdates: A_FrameworkUpdates;
};