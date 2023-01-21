type SubscribeResponse={
	responseContext: ResponseContext;
	actions: (AddToGuideSectionAction|OpenPopupAction|C$RunAttestation|UpdateSubscribeButtonAction)[];
	newNotificationButton: {};
	trackingParams: string;
	frameworkUpdates: FrameworkUpdates;
};