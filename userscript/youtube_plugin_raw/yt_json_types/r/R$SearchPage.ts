type R_SearchPage={
	page: "search";
	endpoint: E$Search;
	response: R_Search;
	url: `/results?search_query=${string}`;
};