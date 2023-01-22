type SearchPageResponse={
	page: "search";
	endpoint: E$Search;
	response: SearchResponse;
	url: `/results?search_query=${string}`;
};
