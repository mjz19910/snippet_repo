type ES_CreatePlaylist={
	clickTrackingParams: string;
	commandMetadata: {
		webCommandMetadata: {
			sendPost: true;
			apiUrl: "/youtubei/v1/playlist/create";
		};
	};
	createPlaylistServiceEndpoint: DS_CreatePlaylist;
};