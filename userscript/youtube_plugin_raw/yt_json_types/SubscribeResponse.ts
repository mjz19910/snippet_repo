type SubscribeResponse={
	responseContext: RC$ResponseContext;
	actions: (AddToGuideSectionAction|A$OpenPopup|C$RunAttestation|UpdateSubscribeButtonAction)[];
	newNotificationButton: {};
	trackingParams: string;
	frameworkUpdates: A$FrameworkUpdates;
};