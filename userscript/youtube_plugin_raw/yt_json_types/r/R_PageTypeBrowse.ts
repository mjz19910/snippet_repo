type R_PageTypeBrowse={
	pageType: "browse";
	endpoint: E_Browse;
	response: R_BrowsePage;
	fromHistory: boolean;
	navigationDoneMs: number;
};
type E_Page=YTNavigateFinishDetail['endpoint'];
type D_STR_CF=[
	"channelId",
][number];