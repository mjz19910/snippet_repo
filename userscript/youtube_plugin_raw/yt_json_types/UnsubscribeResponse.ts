type UnsubscribeResponse={
	responseContext: ResponseContext;
	actions: (RemoveFromGuideSectionAction|OpenPopupAction|UpdateSubscribeButtonAction)[];
	trackingParams: string;
	frameworkUpdates: FrameworkUpdates;
};
