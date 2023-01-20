type SearchPageResponse={
	page: "search";
	endpoint: E$SearchEndpoint;
	response: SearchResponse;
	url: `/results?search_query=${string}`;
};
