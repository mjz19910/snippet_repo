type ClipCreationData={
	trackingParams: string;
	userAvatar: Thumbnail;
	titleInput: ClipCreationTextInputRenderer;
	scrubber: ClipCreationScrubberRenderer;
	saveButton: R$Button;
	displayName: SimpleText;
	publicityLabel: Capitalize<Lowercase<PlaylistAddToOption['privacy']>>;
	cancelButton: R$Button;
	adStateOverlay: ClipAdStateRenderer;
	externalVideoId: string;
	publicityLabelIcon: `PRIVACY_${PlaylistAddToOption['privacy']}`;
};