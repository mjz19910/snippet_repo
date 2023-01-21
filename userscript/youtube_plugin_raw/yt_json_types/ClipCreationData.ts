type ClipCreationData={
	trackingParams: string;
	userAvatar: D$Thumbnail;
	titleInput: ClipCreationTextInputRenderer;
	scrubber: R$ClipCreationScrubber;
	saveButton: R$ButtonRenderer;
	displayName: D$SimpleText;
	publicityLabel: Capitalize<Lowercase<PlaylistAddToOption['privacy']>>;
	cancelButton: R$ButtonRenderer;
	adStateOverlay: R$ClipAdState;
	externalVideoId: string;
	publicityLabelIcon: `PRIVACY_${PlaylistAddToOption['privacy']}`;
};