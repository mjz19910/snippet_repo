type CommentsHeaderRendererData={
	countText: TextT;
	createRenderer: CommentSimpleboxRenderer;
	commentsCount: TextT;
	customEmojis: CustomEmoji[];
	loggingDirectives: {
		trackingParams: string;
		visibility: {};
		enableDisplayloggerExperiment: boolean;
	};
	showSeparator: true;
	sortMenu: SortFilterSubMenuRenderer;
	titleText: TextT;
	trackingParams: string;
	unicodeEmojisUrl: string;
};