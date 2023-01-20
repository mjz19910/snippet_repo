type ConfirmDialogData={
	title?: SimpleText;
	trackingParams: string;
	dialogMessages: TextT[];
	confirmButton: ButtonRenderer;
	cancelButton: ButtonRenderer;
	primaryIsCancel: boolean;
};
