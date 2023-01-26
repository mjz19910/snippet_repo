type RD_MenuServiceItem={
	text: R_TextRuns;
	icon: T_Icon<RD_MenuServiceIconType>;
	serviceEndpoint: E_AddToPlaylistService|E_PlaylistEdit|E_Feedback|T_ES_Signal<M_SendPost,GS_Client>;
	trackingParams: string;
};