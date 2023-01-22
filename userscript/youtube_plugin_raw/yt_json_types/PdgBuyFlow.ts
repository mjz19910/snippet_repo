type PdgBuyFlow={
	header: R$PdgBuyFlowHeader;
	content: SuperVodBuyFlowContentRenderer[];
	trackingParams: string;
	onCloseCommand: GetSurveyCommand;
};
