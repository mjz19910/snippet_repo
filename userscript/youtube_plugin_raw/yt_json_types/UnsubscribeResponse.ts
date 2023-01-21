type UnsubscribeResponse={
	responseContext: RC$ResponseContext;
	actions: (RemoveFromGuideSectionAction|OpenPopupAction|UpdateSubscribeButtonAction)[];
	trackingParams: string;
	frameworkUpdates: FrameworkUpdates;
};
