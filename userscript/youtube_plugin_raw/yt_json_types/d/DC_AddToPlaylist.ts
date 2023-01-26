type DC_AddToPlaylist={
	listType: string;
	onCreateListCommand: ES_CreatePlaylist;
	openListPanel: boolean;
	openMiniplayer: boolean;
	videoId: string;
	videoIds: string[];
};