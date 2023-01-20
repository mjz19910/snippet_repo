type ClipCreationData={
	trackingParams: string;
	userAvatar: Thumbnail;
	titleInput: ClipCreationTextInputRenderer;
	scrubber: ClipCreationScrubberRenderer;
	saveButton: ButtonRenderer;
	displayName: SimpleText;
	publicityLabel: Capitalize<Lowercase<PlaylistAddToOption['privacy']>>;
	cancelButton: ButtonRenderer;
	adStateOverlay: ClipAdStateRenderer;
	externalVideoId: string;
	publicityLabelIcon: `PRIVACY_${PlaylistAddToOption['privacy']}`;
};