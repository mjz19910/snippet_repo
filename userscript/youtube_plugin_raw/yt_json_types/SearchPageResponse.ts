type SearchPageResponse={
	page: "search";
	endpoint: SearchEndpoint;
	response: SearchResponse;
	url: `/results?search_query=${string}`;
};
