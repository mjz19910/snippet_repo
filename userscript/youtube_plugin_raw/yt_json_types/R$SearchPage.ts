type R$SearchPage={
	page: "search";
	endpoint: E$Search;
	response: R$Search;
	url: `/results?search_query=${string}`;
};