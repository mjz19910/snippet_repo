type TextRun={
	text: string;
	navigationEndpoint?: NavigationEndpoint<{
		browseEndpoint: {};
	},never>;
	bold?: boolean;
};
