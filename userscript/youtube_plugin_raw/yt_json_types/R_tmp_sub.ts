type RCA_RelevantStateTags={relevantStateTags: B_StateTag[];};
type RC_ConsistencyTokenJar={
	encryptedTokenJarContents: string;
	expirationSeconds: `${D_TokenJarDefaultExpirationSeconds}`;
};
type RC_CsiServiceC={
	key: "c";
	value: RC_ECatcherClientName['value'];
};
type RC_CsiServiceCVer={
	key: "cver";
	value: string;
};
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
type RC_ECatcherClientName={
	key: "client.name";
	value: "WEB"|"WEB_REMIX";
};
type RC_ECatcherClientVersion={
	key: "client.version";
	value: RC_SomeVer<RC_CsiVarTypes['cver']>;
};
type RC_ECatcherServiceType={["client.fexp"]: `${number}`|`${number},${number}`|`${number},${number},${string}`;};
type RC_ECatcher_SPs={
	service: "ECATCHER";
	params: RC_To_SPs<RC_ECatcherServiceType>|RC_ECatcherClientName[]|RC_ECatcherClientVersion[];
};
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
type RD_MenuServiceIconType_1=[
	"NOT_INTERESTED"|"ADD_TO_QUEUE_TAIL",
	"FLAG",
	"CONTENT_CUT",
	"PLAYLIST_ADD",
	"WATCH_LATER",
	"SHARE",
	"REMOVE",
][number];
type RD_MenuServiceIconType_Sep="SHARE";
type RD_MenuServiceItem=
	|{
		text: G_Text;
		icon: T_Icon<"VISIBILITY_OFF">;
		serviceEndpoint: E_RecordNotificationInteractions;
		trackingParams: string;
		loggingDirectives: D_LoggingDirectives;
	}
	|{
		text: G_Text;
		serviceEndpoint: E_NotificationOptOut;
		trackingParams: string;
		loggingDirectives: D_LoggingDirectives;
	}
	|{
		text: G_Text;
		icon: T_Icon<RD_MenuServiceIconType_1>;
		serviceEndpoint: G_SE_MenuService;
		trackingParams: string;
		hasSeparator?: true;
		isDisabled?: false;
	};
type REG_AccountSwitcher={
	responseContext: RC_ResponseContext;
	selectText: G_Text;
	actions: A_GetMultiPageMenu[];
};
type REG_DatasyncIds={
	responseContext: RC_ResponseContext;
	datasyncIds: (`${number}||${number}`|`${number}||`)[];
};
type RG_Result=R_Tab|R_ExpandableTab;
type RMD_Badge={metadataBadgeRenderer: DMD_Badge;};
type RMD_RowContainer={metadataRowContainerRenderer: DMD_RowContainer;};
type RRC_ResponseContext={responseContext: RC_ResponseContext;};
type RSG_AddToPlaylist={
	responseContext: RC_ResponseContext;
	contents: R_AddToPlaylist[];
	trackingParams: string;
};
type RSG_GetUnseenCount={
	responseContext: RC_ResponseContext;
	actions?: [UA_NotificationsUnseenCount];
	unseenCount?: number;
};
type RSG_NotificationMenu_Action=TA_OpenPopup<D_NotificationMenu_Popup>;
type RSG_NotificationMenu={
	responseContext: RC_ResponseContext;
	actions: RSG_NotificationMenu_Action[];
	trackingParams: string;
};
type RSG_PdgBuyFlow={
	responseContext: RC_ResponseContext;
	command: TA_OpenPopup<R_PdgBuyFlow>;
	trackingParams: string;
	frameworkUpdates: A_FrameworkUpdates;
};
type RSG_SearchSuggestions={
	responseContext: RC_ResponseContext;
	trackingParams: string;
};
type RSG_SharePanel={
	responseContext: RC_ResponseContext;
	trackingParams: string;
	actions: TA_OpenPopup_Empty[];
};
type RSG_Survey={
	responseContext: RC_ResponseContext;
	trackingParams: string;
};
type RSG_Transcript={
	responseContext: RC_ResponseContext;
	actions: UA_EngagementPanel[];
	trackingParams: string;
};
type RSL_Dislike=RRC_ResponseContext&T_Actions<TA_OpenPopup_Empty>;
type RSL_Like={
	responseContext: RC_ResponseContext;
	actions?: (TA_OpenPopup_Empty|A_AddToGuideSection)[];
};
type RSL_RemoveLike={
	responseContext: RC_ResponseContext;
	actions?: (TA_OpenPopup_Empty|A_RemoveFromGuideSection)[];
};
type RSM_ChannelPreference={
	responseContext: RC_ResponseContext;
	actions: TA_OpenPopup_Empty[];
	channelId: `UC${string}`;
	newNotificationButton: R_SubscriptionNotificationToggleButton;
	trackingParams: string;
	frameworkUpdates: R_EntityBatchUpdate;
};
type RSU_M={
	responseContext: RC_ResponseContext;
	continuation: CD_TimedContinuation;
	actions: UMA_Item[];
};
type RS_Search_1={
	responseContext: RC_ResponseContext;
	contents?: R_TabbedSearchResults;
	continuationContents?: RC_MusicShelf;
	trackingParams: string;
	header?: R_MusicHeader;
};
type RS_SearchApi=RS_Search_1|RS_Search;
type AdPlacementRendererItem=[
	R_AdBreakService,
	R_ClientForecastingAd,
	R_InstreamVideoAd,
	R_LinearAdSequence,
][number];
type GR_MP_MenuNotificationSection_Item=R_Notification|R_ContinuationItem;
type RL_ActionCompanionAdInfo=R_AdHoverTextButton;
type D_EmojiPicker={};
type D_LiveChatHeader={};
type D_LiveChatItemList={};
type D_LiveChatMessageInput={};
type D_LiveChatParticipantsList={};
type D_LiveChatTicker={};
type D_Message={};
type D_MusicShelfDivider={};
type D_PaidDigitalGoods={paidDigitalGoods: B_Hack;};
type D_AudioConfig={
	loudnessDb: number;
	perceptualLoudnessDb: number;
	enablePerFormatLoudness: boolean;
};
type D_DescriptionChapters={
	chapters: R_Chapter[];
	trackingParams: string;
	onChapterRepeat: TA_OpenPopup_Empty;
};

type G_NextContents=R_TwoColumnWatchNextResults|R_SingleColumnMusicWatchNextResults;
type G_RendererContentItem=
	|R_RichItem
	|R_RichSection
	|R_CommentsHeader
	|R_CommentThread
	|R_ContinuationItem
	|R_CompactVideo
	|R_CompactPlaylist
	;
;
type G_CommentsSection={};
