type UnsubscribeResponse={
	responseContext: RC$ResponseContext;
	actions: (RemoveFromGuideSectionAction|T$OpenPopup<{}>|UpdateSubscribeButtonAction)[];
	trackingParams: string;
	frameworkUpdates: A$FrameworkUpdates;
};
