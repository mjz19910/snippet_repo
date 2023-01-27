type RD_MenuServiceIconType_Sep="SHARE";

type RD_MenuServiceItem={
	text: R_TextRuns;
	icon: T_Icon<RD_MenuServiceIconType_1>;
	serviceEndpoint: E_AddToPlaylistService|E_PlaylistEdit|E_Feedback|T_SE_Signal<M_SendPost,G_ClientSignal>;
	trackingParams: string;
}|{
	text: R_TextRuns;
	icon: T_Icon<RD_MenuServiceIconType_Sep>;
	serviceEndpoint: ES_ShareEntity;
	trackingParams: string;
	hasSeparator: true;
};