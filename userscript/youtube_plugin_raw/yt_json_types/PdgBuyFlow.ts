type PdgBuyFlow={
	header: PdgBuyFlowHeaderRenderer;
	content: SuperVodBuyFlowContentRenderer[];
	trackingParams: string;
	onCloseCommand: GetSurveyCommand;
};
