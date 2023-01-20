type SearchPageResponse={
	page: "search";
	endpoint: E_SearchEndpoint;
	response: SearchResponse;
	url: `/results?search_query=${string}`;
};
