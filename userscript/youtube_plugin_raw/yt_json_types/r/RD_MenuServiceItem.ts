type RD_MenuServiceItem={
	text: R_TextRuns;
	icon: T_Icon<"NOT_INTERESTED">;
	serviceEndpoint: E_Feedback|TE_SignalService<{},{}>;
	trackingParams: string;
};