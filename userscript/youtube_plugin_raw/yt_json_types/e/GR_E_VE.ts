type TM_VE<T extends number>=TM_Gen<{rootVe:T}>;
type TE_VE<T extends number>=TE_Endpoint_3<"browseEndpoint",any,TM_VE<T>>;
type TE_VE_In=TE_Endpoint_3<"browseEndpoint",any,TM_VE<number>>;
//#region E_VE
type E_VE3611=TE_Endpoint_3<"browseEndpoint",DE_VE3611,M_VE3611|M_VE3611>;
type E_VE3854=TE_Endpoint_3<"browseEndpoint",DE_VE3854,M_VE3854|M_VE3854>;
type E_VE4724_Search=TE_Endpoint_3<"searchEndpoint",DE_VE4724_Search,M_VE4724>;
type E_VE5754=TE_Endpoint_3<"browseEndpoint",DE_VE5754,M_VE5754>;
type E_VE6827=TE_Endpoint_3<"browseEndpoint",DE_VE6827|DE_VE6827_FeedHistory,M_VE6827>;
type E_VE11487=TE_Endpoint_3<"browseEndpoint",DE_VE11487,M_VE11487>;
type E_VE12924_ApplicationSettings={
	clickTrackingParams: string;
	commandMetadata: M_VE12924;
	applicationSettingsEndpoint: B_Hack;
};
type E_VE23462=TE_Endpoint_3<"browseEndpoint",DE_VE23462,M_VE23462>;
type E_VE37414_ReelWatch=TE_Endpoint_3<"reelWatchEndpoint",DE_ReelWatch,TM_Gen<GM_VE37414>>;
type E_VE42352=TE_Endpoint_3<"browseEndpoint",DE_VE42352,M_VE42352>;
type E_VE83769_Url={
	clickTrackingParams: string;
	loggingUrls?: T_BaseUrl<`https://www.youtube.com/pagead/paralleladinteraction?ai=${string}&sigh=${string}&cid=${string}&ad_mt=[AD_MT]&acvw=[VIEWABILITY]&gv=[GOOGLE_VIEWABILITY]&nb=%5BNB%5D&label=video_click_to_advertiser_site`>[];
	commandMetadata: M_VE83769;
	urlEndpoint: DE_VE83769_Url;
};
type E_VE83769_Upload=TE_Endpoint_3<"uploadEndpoint",B_Hack,M_VE83769>;
type E_VE96368=TE_Endpoint_3<"browseEndpoint",DE_VE96368,M_VE96368>;
//#endregion
