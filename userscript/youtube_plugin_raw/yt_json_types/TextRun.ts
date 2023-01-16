type BrowseData_BId_CBUrl={
	browseId: `UC${string}`;
	canonicalBaseUrl: `/@${string}`;
};

type BrowseEndpoint_BId_CBUrl={
	browseEndpoint: BrowseData_BId_CBUrl;
};

type UrlEndpointRedirect={
	urlEndpoint: UrlRedirect;
};

type TextRun={
	text: string;
};
type TextRunTODO={
	navigationEndpoint?: NavigationEndpoint<BrowseEndpoint_BId_CBUrl|UrlEndpointRedirect,never>;
	bold?: boolean;
}
type UrlRedirect={
  url: `https://www.youtube.com/redirect?${string}`,
  target: "TARGET_NEW_WINDOW",
  nofollow: true
};