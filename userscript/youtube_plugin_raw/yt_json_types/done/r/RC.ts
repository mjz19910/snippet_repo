//#region Continuation Renderer
type RC_LiveChat={liveChatContinuation: DC_LiveChat;};
type RC_MusicShelf={musicShelfContinuation: DC_MusicShelf;};
type RC_PlaylistPanel={playlistPanelContinuation: DC_PlaylistPanel;};
type RC_SectionList={sectionListContinuation: GD_RC_SectionList;};
//#endregion
//#region RC
type RC_ConsistencyTokenJar={	encryptedTokenJarContents: string;	expirationSeconds: `${D_TokenJarDefaultExpirationSeconds}`;};
type RC_CsiServiceC={key: "c"; value: RC_ECatcherClientName['value'];};
type RC_CsiServiceCVer={key: "cver"; value: string;};
type RC_CsiVarMap={
	yt_li: "1";
	yt_ad: "1";
	yt_fn: D_BrowseEndpointPages;
	[x: T_RidFormat<string>]: `0x${string}`;
};
type RC_CsiVarTypes={cver: Extract<DRC_Csi_SPs[number],{key: "cver";}>['value'];};
type RC_Csi_SPs={
	service: "CSI",
	params: DRC_Csi_SPs;
};
type RC_ECatcherClientName={key: "client.name"; value: "WEB"|"WEB_REMIX";};
type RC_ECatcherClientVersion={key: "client.version"; value: RC_SomeVer<RC_CsiVarTypes['cver']>;};
type RC_ECatcherServiceType={["client.fexp"]: `${number}`|`${number},${number}`|`${number},${number},${string}`;};
type RC_ECatcher_ParamItem=RC_ECatcherClientName|RC_ECatcherClientVersion;
type RC_ECatcher_SPs={service: "ECATCHER"; params: RC_To_SPs<RC_ECatcherServiceType>|RC_ECatcher_ParamItem[];};
type RC_GFeedback_SPs={service: "GFEEDBACK"; params: SP_GFeedbackServiceParamsType;};
type RC_GoogleHelp_SPs={service: "GOOGLE_HELP"; params: RC_To_SPs<SP_GoogleHelpServiceObj>;};
type RC_MainAppWebResponseContext={
	datasyncId: `${number}||${number}`;
	loggedOut: boolean;
};
type RC_ResponseContext={
	mainAppWebResponseContext?: RC_MainAppWebResponseContext;
	serviceTrackingParams: GRC_ServiceTrackingParams[];
	webResponseContextExtensionData?: RC_WR_ContextExtension;
	consistencyTokenJar?: RC_ConsistencyTokenJar;
	maxAgeSeconds?: number;
	stateTags?: RCA_RelevantStateTags;
};
type RC_ResponseContext_1={
	mainAppWebResponseContext: RC_MainAppWebResponseContext;
	serviceTrackingParams: GRC_ServiceTrackingParams[];
	webResponseContextExtensionData: RC_WR_ContextExtension;
};
type RC_SomeVer<T extends string>=T extends `${infer V0}.${infer V1}.${string}.${string}`? `${V0}.${V1}`:T;
type RC_To_SPs<T>={[U in keyof T]: {key: U; value: T[U];};}[keyof T][];
type RC_WR_ContextExtension={
	hasDecorated?: boolean;
	ytConfigData?: D_YtConfig;
	webPrefetchData?: D_WebPrefetch;
};
//#endregion