type PlaylistAddToOption={
	playlistId: PlaylistId;
	title: SimpleText;
	privacy: "PRIVATE";
	containsSelectedVideos: "NONE";
	privacyIcon: Icon<"PRIVACY_PRIVATE">;
	addToPlaylistServiceEndpoint: PlaylistEditEndpoint;
	removeFromPlaylistServiceEndpoint: PlaylistEditEndpoint;
	trackingParams: string;
};

type PlaylistAddToOptionRenderer={
	playlistAddToOptionRenderer: PlaylistAddToOption;
};
type TextInputFormField={
	label: TextWithRuns;
	maxCharacterLimit: 150;
	placeholderText: string;
	validValueRegexp: "[^<>]*";
	invalidValueErrorMessage: TextWithRuns;
	required: true;
};

type TextInputFormFieldRenderer={
	textInputFormFieldRenderer: TextInputFormField;
};

type DropdownRenderer={
	dropdownRenderer: {};
};

type AddToPlaylistCreate={
	openCreateLink: CompactLinkRenderer;
	nameInput: TextInputFormFieldRenderer;
	privacyInput: DropdownRenderer;
	createAction: ButtonRenderer;
	serviceEndpoint: CreatePlaylistServiceEndpoint;
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