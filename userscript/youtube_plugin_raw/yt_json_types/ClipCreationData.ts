type D$ClipCreation={
	trackingParams: string;
	userAvatar: D$Thumbnail;
	titleInput: R$ClipCreationTextInput;
	scrubber: R$ClipCreationScrubber;
	saveButton: R$Button;
	displayName: D$SimpleText;
	publicityLabel: Capitalize<Lowercase<D$PlaylistAddToOption['privacy']>>;
	cancelButton: R$Button;
	adStateOverlay: R$ClipAdState;
	externalVideoId: string;
	publicityLabelIcon: `PRIVACY_${D$PlaylistAddToOption['privacy']}`;
};