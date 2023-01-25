type RD_MenuServiceItem=[
	D_MenuServiceItem<null,{}>,
	D_MenuServiceItem<"NOT_INTERESTED",E_Feedback>,
	D_MenuServiceItem<"ADD_TO_QUEUE_TAIL",TE_SignalService<{}>>,
	D_MenuServiceItem<"WATCH_LATER",E_PlaylistEdit>,
	{
		text: R_TextWithRuns;
		icon: T_Icon<"PLAYLIST_ADD">;
		serviceEndpoint: E_AddToPlaylistService;
		trackingParams: string;
		hasSeparator: true;
	},
][number];

type R_MenuServiceItem={
	menuServiceItemRenderer: RD_MenuServiceItem;
};