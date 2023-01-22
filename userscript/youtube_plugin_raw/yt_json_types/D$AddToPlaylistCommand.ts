type DC$AddToPlaylist={
	listType: string;
	onCreateListCommand: CreatePlaylistServiceEndpoint;
	openListPanel: boolean;
	openMiniplayer: boolean;
	videoId: string;
	videoIds: string[];
};