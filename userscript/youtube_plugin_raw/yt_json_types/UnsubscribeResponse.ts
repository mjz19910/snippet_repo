type UnsubscribeResponse={
	responseContext: RC$ResponseContext;
	actions: (RemoveFromGuideSectionAction|A$OpenPopup|UpdateSubscribeButtonAction)[];
	trackingParams: string;
	frameworkUpdates: A$FrameworkUpdates;
};
