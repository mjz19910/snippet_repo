type RD_MenuServiceIconType_Sep="SHARE";
type RD_MenuServiceItem={
	text: R_TextRuns;
	icon: T_Icon<RD_MenuServiceIconType_1>;
	serviceEndpoint: E_AddToPlaylistService|E_PlaylistEdit|E_Feedback|SE_Signal_SendPost;
	trackingParams: string;
	hasSeparator?: true;
	isDisabled?: false;
};