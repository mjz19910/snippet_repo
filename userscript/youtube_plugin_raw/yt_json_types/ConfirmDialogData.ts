type ConfirmDialogData={
	title: TextWithRuns;
	trackingParams: string;
	dialogMessages: TextWithRuns[];
	confirmButton: ButtonRenderer;
	cancelButton: ButtonRenderer;
	primaryIsCancel: boolean;
};
