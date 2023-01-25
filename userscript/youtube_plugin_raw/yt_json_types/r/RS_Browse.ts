type RS_Browse={
	responseContext: RC_ResponseContext;
	contents?: G_BrowseContents;
	continuationContents?: C_SectionList;
	header?: G_BrowseHeader;
	alerts?: R_AlertWithButton[];
	metadata?: G_Browse_MD;
	trackingParams: string;
	topbar?: R_DesktopTopbar;
	microformat?: R_Microformat;
	frameworkUpdates?: R_EntityBatchUpdate;
	maxAgeStoreSeconds?: number;
	background?: R_MusicThumbnail;
	onResponseReceivedActions?: A_ResponseReceived[];
	sidebar?: G_BrowseSidebar;
	observedStateTags?: B_StateTag[];
	cacheMetadata?: D_Cache_MD;
};
type Alt_RS_Browse_raw=[
	"responseContext,contents,header,trackingParams,topbar,onResponseReceivedActions,frameworkUpdates",
	"responseContext,contents,header,trackingParams,topbar,onResponseReceivedActions",
	"responseContext,contents,trackingParams,topbar,sidebar",
	"responseContext,header,trackingParams,onResponseReceivedActions",
	"responseContext,trackingParams,onResponseReceivedActions",
	"responseContext,contents,header,trackingParams,topbar",
];
type Alt_RS_Get<T extends number>=Required<{[U in T_Split<Alt_RS_Browse_raw[T],",">[number]]: U extends keyof RS_Browse? RS_Browse[U]:never;}>;
type Alt_RS_Browse=[
	Alt_RS_Get<0>,
	Alt_RS_Get<1>,
	Alt_RS_Get<2>,
	Alt_RS_Get<3>,
	Alt_RS_Get<4>,
	Alt_RS_Get<5>,
][number];
type RR={[U in keyof Alt_RS_Browse]: RS_Browse[U]};
