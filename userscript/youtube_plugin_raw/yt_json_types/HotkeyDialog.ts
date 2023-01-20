type HotkeyDialog={
	title: TextWithRuns;
	sections: {
		hotkeyDialogSectionRenderer: {
			title: TextWithRuns;
			options: {}[];
		};
	}[];
	dismissButton: ButtonRenderer;
	trackingParams: string;
};