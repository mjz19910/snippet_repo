type RD_MenuServiceItem=[
	D_MenuServiceItem<{}>,
	D_MenuServiceItem_Icon<"NOT_INTERESTED",E_Feedback>,
	D_MenuServiceItem_Icon<"ADD_TO_QUEUE_TAIL",TE_SignalService<{}>>,
	D_MenuServiceItem_Icon<"WATCH_LATER",E_PlaylistEdit>,
	D_MenuServiceItem_Separated<"PLAYLIST_ADD",E_AddToPlaylistService>,
][number];

type R_MenuServiceItem={
	menuServiceItemRenderer: RD_MenuServiceItem;
};
type D_MenuServiceItem_Icon<T extends string,T_EI>={
	text: G_Text;
	icon: T_Icon<T>;
	serviceEndpoint: T_EI;
	trackingParams: string;
};
type D_MenuServiceItem_Separated<T extends string,T_EI>={
	text: G_Text;
	icon: T_Icon<T>;
	serviceEndpoint: T_EI;
	trackingParams: string;
	hasSeparator: true;
};