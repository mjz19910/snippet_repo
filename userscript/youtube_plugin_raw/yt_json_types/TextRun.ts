type BrowseData_BId_CBUrl={
	browseId: `UC${string}`;
	canonicalBaseUrl: `/@${string}`;
};

type BrowseEndpoint_BId_CBUrl={
	browseEndpoint: BrowseData_BId_CBUrl;
};

type TextRun={
	text: string;
	navigationEndpoint?: NavigationEndpoint<BrowseEndpoint_BId_CBUrl,never>;
	bold?: boolean;
};
