type D__ClipCreation={
	trackingParams: string;
	userAvatar: D__Thumbnail;
	titleInput: R_ClipCreationTextInput;
	scrubber: R_ClipCreationScrubber;
	saveButton: R_Button;
	displayName: R_SimpleText;
	publicityLabel: Capitalize<Lowercase<D__PlaylistAddToOption['privacy']>>;
	cancelButton: R_Button;
	adStateOverlay: R_ClipAdState;
	externalVideoId: string;
	publicityLabelIcon: `PRIVACY_${D__PlaylistAddToOption['privacy']}`;
};