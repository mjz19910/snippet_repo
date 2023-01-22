type SubscribeResponse={
	responseContext: RC$ResponseContext;
	actions: (AddToGuideSectionAction|T$OpenPopup<{}>|C$RunAttestation|UpdateSubscribeButtonAction)[];
	newNotificationButton: {};
	trackingParams: string;
	frameworkUpdates: A$FrameworkUpdates;
};