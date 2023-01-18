type PdgCommentPreviewRenderer={
	pdgCommentPreviewRenderer: {
		title: TextWithRuns;
		authorThumbnail: Thumbnail;
		authorText: SimpleText;
		commentOptionRenderers: PdgCommentOptionRenderer[];
		defaultCommentText: TextWithRuns;
		editButton: ButtonRenderer;
		superThanksSelectedTierEntity: SuperThanksSelectedTierEntity;
	};
};
