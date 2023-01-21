type ClipCreationData={
	trackingParams: string;
	userAvatar: D$Thumbnail;
	titleInput: ClipCreationTextInputRenderer;
	scrubber: ClipCreationScrubberRenderer;
	saveButton: R$Button;
	displayName: D$SimpleText;
	publicityLabel: Capitalize<Lowercase<PlaylistAddToOption['privacy']>>;
	cancelButton: R$Button;
	adStateOverlay: ClipAdStateRenderer;
	externalVideoId: string;
	publicityLabelIcon: `PRIVACY_${PlaylistAddToOption['privacy']}`;
};