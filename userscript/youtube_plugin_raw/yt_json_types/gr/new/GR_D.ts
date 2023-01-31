//#region String data, ie `D_${string}`
type D_EndpointLikeEndings="Endpoint"|"Command"|"Action";
//#endregion
//#region Enum data, ie `D_${string}`
type D_AddToOfflineButtonState=T_EnumStr<
	"ADD_TO_OFFLINE_BUTTON_STATE",[
		"UNKNOWN",
		"ENABLED"
	][number]
>;
//#endregion
//#region Entity data, ie `D_EY_${string}`
type D_EY_Offlineability={
	key: string;
	command: C_Innertube;
	addToOfflineButtonState: D_AddToOfflineButtonState;
	contentCheckOk: false;
	racyCheckOk: false;
	loggingDirectives: D_LoggingDirectives;
};
//#endregion
type D_AddToPlaylistCreate={
	openCreateLink: R_CompactLink;
	nameInput: R_TextInputFormField;
	privacyInput: R_Dropdown;
	createAction: R_Button;
	serviceEndpoint: SE_CreatePlaylist;
};
//#region Icons
type D_Icon_Button=T_Icon<DE_IconType_Button>;
//#endregion
//#region 
type D_Survey_Watch={watch: B_Hack;};
//#endregion
type D_ProfileColumn={items: G_ProfileColumnItem[];};
type D_EngagementPanelSectionList=
	|G_SI_DB_EngagementPanel
	|SI_VE76278_EngagementPanel
	|SI_VE99999_EngagementPanel
	|SI_VE124975_EngagementPanel
	|SI_VE126250_EngagementPanel
	|SI_VE139722_EngagementPanel
	;
;
type D_EngagementPanelSectionShortsComments=Record<"content",R_SectionList>&{
	continuationService: "ENGAGEMENT_PANEL_CONTINUATION_SERVICE_BROWSE";
	header: {};
	identifier: {
		surface: "ENGAGEMENT_PANEL_SURFACE_SHORTS";
		tag: "shorts-comments-panel";
	};
	loggingDirectives: {};
	targetId: "shorts-comments-panel";
	veType: 139722;
	visibility: "ENGAGEMENT_PANEL_VISIBILITY_HIDDEN";
};
type D_EngagementPanelSectionTargetId=T_TargetIdStr<
	"engagement-panel",[
		"ads",
		"clip-create",
		"structured-description",
		"comments-section",
		"macro-markers-description-chapters"
	][number]
>;
type D_EngagementPanelStructuredDescription=Record<"content",{}>&{
	header: {};
	identifier: {
		surface: "ENGAGEMENT_PANEL_SURFACE_SHORTS";
		tag: "engagement-panel-structured-description";
	};
	loggingDirectives: {};
	targetId: "engagement-panel-structured-description";
	veType: 124975;
	visibility: "ENGAGEMENT_PANEL_VISIBILITY_HIDDEN";
};
type D_EngagementPanelTargetId="engagement-panel-comments-section"|"engagement-panel-clip-view"|"engagement-panel-clip-create"|"engagement-panel-structured-description"|"engagement-panel-macro-markers-auto-chapters"|"engagement-panel-macro-markers-description-chapters";
type D_EngagementPanelVisibility="ENGAGEMENT_PANEL_VISIBILITY_EXPANDED"|"ENGAGEMENT_PANEL_VISIBILITY_HIDDEN";
type D_TargetIdStr=[
	AD_AppendContinuationItems['targetId'],
	TA_Continuation<"browse-feedFEwhat_to_watch",R_BrowseFeed>['targetId'],
	"comments-section",
	"search-feed",
	D_EngagementPanelSectionTargetId,
	DC_ScrollToEngagementPanel['targetId'],
	RS_Search['targetId'],
	D_TranscriptSearchPanel['targetId'],
	AD_UpdateEngagementPanel['targetId'],
	A_WatchNextContinuation['targetId'],
	D_ChipCloudChip_tid['targetId'],
	`shopping_panel_for_entry_point_${"5"|"22"}`,
	"clip-info-button",
	"sponsorships-button",
	D_Menu_TargetId,
	G_SI_DB_EngagementPanel['targetId'],
	D_Button_TargetId
][number];
type D_TranscriptSearchPanel={
	body: R_TranscriptSegmentList;
	footer: R_TranscriptFooter;
	trackingParams: string;
	targetId: "engagement-panel-searchable-transcript-search-panel";
};
type D_UiTargetId="browse-feedFEwhat_to_watch"|"watch-next-feed";
type DCE_Button={
	command: GC_Button;
	targetId: D_Button_TargetId;
};
type D_Button_EX_1_Command=Extract<D_Button,{command: any;}>;
type D_Button_DoExtract<T extends D_Button>=T extends infer Y? Omit<Y,"size"|"style"|"isDisabled"|"trackingParams"|"command"|"text">:never;
type D_Button_Ex_1_Omit_Size=D_Button extends infer T?(T extends infer Y? Omit<Y,"size"|"style"|"isDisabled"|"trackingParams"|"command"|"text">:never) extends infer Z?{[U in keyof Z]: Z[U]}:never:never;
type D_Button_EX_1_Style=Extract<Exclude<D_Button,D_Button_EX_1_Command>,{style: any;}>;
type D_Button_EX_2_Text=Extract<D_Button,{text: any;}>;
type D_Button_NP_1_Style=D_Button_EX_1_Command|D_Button_EX_1_Style;
type D_Button_EX_1_SrvEp=Extract<Exclude<D_Button,D_Button_NP_1_Style>,{serviceEndpoint: any;}>;
type D_Button_NP_1_SrvEp=D_Button_NP_1_Style|D_Button_EX_1_SrvEp;
type D_Button_ER_1_Rest=Exclude<D_Button,D_Button_NP_1_SrvEp>;
type D_Button_SE=T_SE_Signal<M_SendPost,G_ClientSignal>|E_YpcGetOffers|E_ShareEntityService;
type Popup_ShareEntityService=T_DialogPopup_ReuseFlag<R_UnifiedSharePanel>;

type D_SubscriptionNotificationToggleButton={
	states: [
		{
			stateId: 2;
			nextStateId: 2;
			state: R_Button;
		},
		{
			stateId: 3;
			nextStateId: 3;
			state: R_Button;
		},
		{
			stateId: 0;
			nextStateId: 0;
			state: R_Button;
		}
	];
	currentStateId: 2;
	trackingParams: string;
	command: C_Executor;
	targetId: "notification-bell";
	secondaryIcon: T_Icon<"EXPAND_MORE">;
};
type D_RadioShareUrl=
	|`https://www.youtube.com/watch?v=${string}&playnext=1&list=RDCMUC${string}`
	|`https://www.youtube.com/playlist?list=PL${string}`
	|`https://www.youtube.com/watch?v=${string}&playnext=1&list=PL${string}`
	|`https://www.youtube.com/watch?v=${string}&playnext=1&list=RD${string}`
	;
;
type D_CompactRadio={
	playlistId: `RD${string}`|`RDGM${string}`;
	thumbnail: R_Thumbnail&R_SampledThumbnailColor;
	title: G_Text;
	navigationEndpoint: E_Watch;
	videoCountText: G_Text;
	secondaryNavigationEndpoint: E_Watch;
	longBylineText: G_Text;
	trackingParams: string;
	thumbnailText: G_Text;
	videoCountShortText: G_Text;
	shareUrl: D_RadioShareUrl;
	menu: R_Menu;
	thumbnailOverlays: G_ThumbnailOverlayItem[];
};
type DE_SuperThanksSelectedTier={key: string; index: number;};
type D_PdgColorSlider={
	notches: D_NotchesItem[];
	superThanksSelectedTierEntity: DE_SuperThanksSelectedTier;
	maxTierValue: G_Text;
	minTierValue: G_Text;
};
type D_SuperVodBuyFlowContent={
	description: G_Text;
	buyButton: R_Button;
	trackingParams: string;
	commentPreview: R_PdgCommentPreview;
	disclaimerText: G_Text;
	colorSlider: R_PdgColorSlider;
	defaultPriceTier: number;
	superThanksSelectedTierEntity: DE_SuperThanksSelectedTier;
};
type D_PdgCommentPreview={
	title: G_Text;
	authorThumbnail: R_Thumbnail;
	authorText: G_Text;
	commentOptionRenderers: R_PdgCommentOption[];
	defaultCommentText: G_Text;
	editButton: R_Button;
	superThanksSelectedTierEntity: DE_SuperThanksSelectedTier;
};
type D_NotificationTopbarButton={
	icon: T_Icon<"NOTIFICATIONS">;
	menuRequest: EG_GetNotificationMenuRequest;
	style: "NOTIFICATION_BUTTON_STYLE_TYPE_DEFAULT";
	trackingParams: string;
	accessibility: D_Accessibility;
	tooltip: string;
	updateUnseenCountEndpoint: T_SE_Signal<M_GetUnseenNotificationCount,T_Signal<"GET_UNSEEN_NOTIFICATION_COUNT">>;
	notificationCount: number;
	handlerDatas: ["NOTIFICATION_ACTION_UPDATE_UNSEEN_COUNT"];
};
