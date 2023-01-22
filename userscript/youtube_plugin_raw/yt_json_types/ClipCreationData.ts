type D__ClipCreation={
	trackingParams: string;
	userAvatar: D__Thumbnail;
	titleInput: R$ClipCreationTextInput;
	scrubber: R$ClipCreationScrubber;
	saveButton: R$Button;
	displayName: R$SimpleText;
	publicityLabel: Capitalize<Lowercase<D__PlaylistAddToOption['privacy']>>;
	cancelButton: R$Button;
	adStateOverlay: R$ClipAdState;
	externalVideoId: string;
	publicityLabelIcon: `PRIVACY_${D__PlaylistAddToOption['privacy']}`;
};