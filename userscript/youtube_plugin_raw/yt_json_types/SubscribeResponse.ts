type SubscribeResponse={
	responseContext: RC$ResponseContext;
	actions: (AddToGuideSectionAction|OpenPopupAction|C$RunAttestation|UpdateSubscribeButtonAction)[];
	newNotificationButton: {};
	trackingParams: string;
	frameworkUpdates: A$FrameworkUpdates;
};