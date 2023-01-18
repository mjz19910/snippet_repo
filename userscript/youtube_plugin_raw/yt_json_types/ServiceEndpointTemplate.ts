type EditPlaylistWebCommandMetadata={
	sendPost: true;
	apiUrl: "/youtubei/v1/browse/edit_playlist";
};

type EditPlaylistCommandMetadata={
	webCommandMetadata: EditPlaylistWebCommandMetadata;
};

type ServiceEndpointTemplate<T extends {}>={
	clickTrackingParams: string;
	commandMetadata: EditPlaylistCommandMetadata;
}&T;