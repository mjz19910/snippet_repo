type ClipCreationData={
	trackingParams: string;
	userAvatar: {};
	titleInput: {};
	scrubber: {};
	saveButton: {};
	displayName: {};
	publicityLabel: Capitalize<Lowercase<PlaylistAddToOption['privacy']>>;
	cancelButton: {};
	adStateOverlay: {};
	externalVideoId: string;
	publicityLabelIcon: `PRIVACY_${PlaylistAddToOption['privacy']}`;
};