type R_SearchPage={
	page: "search";
	endpoint: E_Search;
	response: RS_Search;
	url: `/results?search_query=${string}`;
};