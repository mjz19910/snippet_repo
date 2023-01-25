type RD_MenuServiceItem=[
	D_MenuServiceItem<{}>,
	D_MenuServiceItem_Icon<"NOT_INTERESTED",E_Feedback>,
	D_MenuServiceItem_Icon<"ADD_TO_QUEUE_TAIL",TE_SignalService<{}>>,
	D_MenuServiceItem_Icon<"WATCH_LATER",E_PlaylistEdit>,
	D_MenuServiceItem_Separated<"PLAYLIST_ADD",E_AddToPlaylistService>,
][number];