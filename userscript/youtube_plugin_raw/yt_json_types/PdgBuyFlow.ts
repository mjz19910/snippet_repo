type PdgBuyFlow={
	header: R$PdgBuyFlowHeader;
	content: R$SuperVodBuyFlowContent[];
	trackingParams: string;
	onCloseCommand: GetSurveyCommand;
};
