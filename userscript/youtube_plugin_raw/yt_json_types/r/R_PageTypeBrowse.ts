type R_PageTypeBrowse={
	pageType: "browse";
	endpoint: GE_Browse;
	response: RS_BrowsePage;
	fromHistory: boolean;
	navigationDoneMs: number;
};
type E_Page=YTNavigateFinishDetail['endpoint'];
type D_STR_CF=[
	"D_ChannelId",
	"D_CompactRadio_shareUrl",
	"D_YoutubeKidsUrl",
	"D_YoutubeUrl",
	"G_VE3832",
	"G_VE4724",
	"G_VE37414",
	"G_VE83769",
][number];
type D_CaseGen_CF=[
	"codegen_case",
][number];
