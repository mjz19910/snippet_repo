type PdgBuyFlowHeader={
	text: TextWithRuns;
	helpButton: ButtonRenderer;
	dismissButton: ButtonRenderer;
};

type PdgBuyFlowHeaderRenderer={
	pdgBuyFlowHeaderRenderer: PdgBuyFlowHeader;
};
type PdgCommentPreviewRenderer={};
type PdgColorSliderRenderer={};
type SuperVodBuyFlowContent={
	description: TextWithRuns;
	buyButton: ButtonRenderer;
	trackingParams: string;
	commentPreview: PdgCommentPreviewRenderer;
	disclaimerText: TextWithRuns;
	colorSlider: PdgColorSliderRenderer;
	defaultPriceTier: 0;
	superThanksSelectedTierEntity: SuperThanksSelectedTierEntity;
};

type SuperVodBuyFlowContentRenderer={
	superVodBuyFlowContentRenderer: SuperVodBuyFlowContent;
};

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
