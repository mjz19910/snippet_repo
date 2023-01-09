type SubscribeResponse={
	responseContext: ResponseContext;
	actions: (AddToGuideSectionAction|OpenPopupAction|RunAttestationCommand|UpdateSubscribeButtonAction)[];
	newNotificationButton: {};
	trackingParams: string;
	frameworkUpdates: FrameworkUpdates;
};