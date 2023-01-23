type D_PdgBuyFlow={
	header: R_PdgBuyFlowHeader;
	content: R_SuperVodBuyFlowContent[];
	trackingParams: string;
	onCloseCommand: C_GetSurvey;
};