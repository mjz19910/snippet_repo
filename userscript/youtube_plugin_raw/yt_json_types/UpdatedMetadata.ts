type UpdatedMetadata={
	responseContext: ResponseContext;
	continuation: TimedContinuationData;
	actions: [
		UpdateViewershipAction,
		UpdateToggleButtonTextAction,
		UpdateDateTextAction,
		UpdateTitleAction,
		UpdateDescriptionAction
	];
};
