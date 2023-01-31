type DC_AddToPlaylist={
	listType: "PLAYLIST_EDIT_LIST_TYPE_QUEUE";
	onCreateListCommand: SE_CreatePlaylist;
	openListPanel: boolean;
	openMiniplayer: boolean;
	videoId: string;
	videoIds: string[];
};