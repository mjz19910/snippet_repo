type ConfirmDialogData={
	title: TextT;
	trackingParams: string;
	dialogMessages: TextWithRuns[];
	confirmButton: ButtonRenderer;
	cancelButton: ButtonRenderer;
	primaryIsCancel: boolean;
};
