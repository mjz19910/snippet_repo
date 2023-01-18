type PdgBuyFlowRenderer={
	pdgBuyFlowRenderer: {
		header: PdgBuyFlowHeaderRenderer;
		content: SuperVodBuyFlowContentRenderer[];
		trackingParams: string;
		onCloseCommand: GetSurveyCommand;
	};
};
