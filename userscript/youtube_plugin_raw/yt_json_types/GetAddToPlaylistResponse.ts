type PlaylistAddToOption={
	playlistId: string;
	title: SimpleText;
	privacy: "PRIVATE";
	containsSelectedVideos: "NONE";
	privacyIcon: Icon<"PRIVACY_PRIVATE">;
	addToPlaylistServiceEndpoint: PlaylistEditEndpoint;
	removeFromPlaylistServiceEndpoint: {
		clickTrackingParams: string;
		commandMetadata: CommandMetadata;
		playlistEditEndpoint: {};
	};
	trackingParams: string;
};

type PlaylistAddToOptionRenderer={
	playlistAddToOptionRenderer: PlaylistAddToOption;
};
type AddToPlaylistCreate={
	openCreateLink: CompactLinkRenderer;
	nameInput: {
		textInputFormFieldRenderer: {
			label: TextWithRuns;
			maxCharacterLimit: 150;
			placeholderText: "Enter playlist name...";
			validValueRegexp: "[^<>]*";
			invalidValueErrorMessage: TextWithRuns;
			required: true;
		};
	};
	privacyInput: {
		dropdownRenderer: {};
	};
	createAction: ButtonRenderer;
	serviceEndpoint: {
		clickTrackingParams: string;
		commandMetadata: CommandMetadata;
		createPlaylistServiceEndpoint: {};
	};
};

type AddToPlaylistCreateRenderer={
	addToPlaylistCreateRenderer: AddToPlaylistCreate;
};
type AddToPlaylist={
	playlists: PlaylistAddToOptionRenderer[];
	actions: AddToPlaylistCreateRenderer[];
};

type AddToPlaylistRenderer={
	addToPlaylistRenderer: AddToPlaylist;
};

type GetAddToPlaylistResponse={
	responseContext: ResponseContext;
	contents: AddToPlaylistRenderer[];
	trackingParams: string;
};