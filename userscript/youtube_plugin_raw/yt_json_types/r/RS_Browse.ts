type RS_Browse={
	responseContext: RC$ResponseContext;
	contents?: G$BrowseContents;
	continuationContents?: C_SectionList;
	header?: G$BrowseHeader;
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
	observedStateTags?: B$StateTag[];
	cacheMetadata?: D_Cache_MD;
};
type Alt_RS_Browse_raw=[
	"responseContext,contents,header,trackingParams,topbar,onResponseReceivedActions,frameworkUpdates",
	"responseContext,contents,header,trackingParams,topbar,onResponseReceivedActions",
	"responseContext,contents,trackingParams,topbar,sidebar",
	"responseContext,header,trackingParams,onResponseReceivedActions",
];
type Alt_RS_Get<T extends number>=Required<{[U in Split<Alt_RS_Browse_raw[T],",">[number]]: U extends keyof RS_Browse? RS_Browse[U]:never;}>;
type Alt_RS_Browse=[
	Alt_RS_Get<0>,
	Alt_RS_Get<1>,
	Alt_RS_Get<2>,
	Alt_RS_Get<3>,
][number];
type RR={[U in keyof Alt_RS_Browse]: RS_Browse[U]};
