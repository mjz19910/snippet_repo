type D_ClipCreation={
	trackingParams: string;
	userAvatar: R_Thumbnail;
	titleInput: R_ClipCreationTextInput;
	scrubber: R_ClipCreationScrubber;
	saveButton: R_Button;
	displayName: D_Text;
	publicityLabel: Capitalize<Lowercase<D_PlaylistAddToOption['privacy']>>;
	cancelButton: R_Button;
	adStateOverlay: R_ClipAdState;
	externalVideoId: string;
	publicityLabelIcon: `PRIVACY_${D_PlaylistAddToOption['privacy']}`;
};