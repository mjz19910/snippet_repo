type PdgBuyFlowHeader={
	text: TextWithRuns;
	helpButton: ButtonRenderer;
	dismissButton: ButtonRenderer;
};

type PdgBuyFlowHeaderRenderer={
	pdgBuyFlowHeaderRenderer: PdgBuyFlowHeader;
};

type SuperVodBuyFlowContentRenderer={};

type GetSurveyCommand={
	clickTrackingParams: string;
	commandMetadata: {};
	getSurveyCommand: {};
};

type AllPopups=
	|MultiPageMenuRenderer
	|ConfirmDialogRenderer
	|NotificationActionRenderer
	|{
		pdgBuyFlowRenderer: {
			header: PdgBuyFlowHeaderRenderer;
			content: SuperVodBuyFlowContentRenderer[];
			trackingParams: string;
			onCloseCommand: GetSurveyCommand;
		};
	}
	;
;
