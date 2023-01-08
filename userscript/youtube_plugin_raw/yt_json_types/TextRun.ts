type TextRun={
	text: string;
	navigationEndpoint?: NavigationEndpoint<{
		browseEndpoint: {
			browseId: `UC${string}`;
			canonicalBaseUrl: `/@${string}`;
		};
	},never>;
	bold?: boolean;
};
