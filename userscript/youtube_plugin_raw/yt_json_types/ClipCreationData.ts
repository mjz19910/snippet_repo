type ClipCreationData={
	trackingParams: string;
	userAvatar: D$Thumbnail;
	titleInput: R$ClipCreationTextInput;
	scrubber: R$ClipCreationScrubber;
	saveButton: R$Button;
	displayName: D$SimpleText;
	publicityLabel: Capitalize<Lowercase<PlaylistAddToOption['privacy']>>;
	cancelButton: R$Button;
	adStateOverlay: R$ClipAdState;
	externalVideoId: string;
	publicityLabelIcon: `PRIVACY_${PlaylistAddToOption['privacy']}`;
};