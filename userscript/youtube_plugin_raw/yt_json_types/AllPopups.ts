type AllPopups=
	|MultiPageMenuRenderer
	|ConfirmDialogRenderer
	|NotificationActionRenderer
	|{
		pdgBuyFlowRenderer: {
			header: {
				pdgBuyFlowHeaderRenderer: {
					text: TextWithRuns;
					helpButton: {};
					dismissButton: {};
				};
			};
			content: {}[];
			trackingParams: string;
			onCloseCommand: {
				clickTrackingParams: string;
				commandMetadata: {};
				getSurveyCommand: {};
			};
		};
	}
	;
;
