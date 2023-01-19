
type PlaylistAddToOptionRenderer={
	playlistAddToOptionRenderer: {
		playlistId: string;
		title: SimpleText;
		privacy: "PRIVATE";
		containsSelectedVideos: "NONE";
		privacyIcon: Icon<"PRIVACY_PRIVATE">;
		addToPlaylistServiceEndpoint: {
			clickTrackingParams: string;
			commandMetadata: CommandMetadata;
			playlistEditEndpoint: {
				playlistId: string;
				actions: {
					addedVideoId: "pwmIQzLuYl0";
					action: "ACTION_ADD_VIDEO";
				}[];
			};
		};
		removeFromPlaylistServiceEndpoint: {
			clickTrackingParams: string;
			commandMetadata: CommandMetadata;
			playlistEditEndpoint: {};
		};
		trackingParams: string;
	};
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