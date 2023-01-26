type RD_MenuServiceItem={
	text: R_TextRuns;
	icon: T_Icon<RD_MenuServiceIconType>;
	serviceEndpoint: E_Feedback|TE_SignalService<M_SendPost,GS_Client>;
	trackingParams: string;
};