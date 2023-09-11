//#region DE_VE
export type DE_VE<T>={browseId: T;};
export type DE_VE3611_BaseUrl=
	|`/@${string}`
	|`/channel/UC${string}`
	;
;
export type DE_VE3611={
	params?: string; browseId: T_IdTemplate<"UC",D_UserIdStr>;
	canonicalBaseUrl?: DE_VE3611_BaseUrl;
	query?: string;
};
export type DE_VE3854=DE_VE<"FEwhat_to_watch">;
export type DE_VE5754=DE_VE<T_IdTemplate<"VL">>|{
	browseId: T_IdTemplate<"VL">;
	canonicalBaseUrl: `/playlist?list=PL${string}`;
};
export type DE_VE6827={
	browseId: GU_VE6827_Id;
	params?: string;
	query?: "";
};
export type DE_VE11487=DE_VE<"SPunlimited">;
export type DE_VE23462=DE_VE<GU_VE23462_Id>;
export type DE_VE42352=DE_VE<"FEdownloads">;
export type DE_VE96368=DE_VE<"FEsubscriptions">;
import {A_HideEnclosing,A_ReplaceEnclosing,A_UndoFeedback,GA_Playlist} from "../abc/A.js";
import {B_Hack} from "../abc/group_B.js";
import {C_FilterChipTransform,C_MusicLibraryStatusUpdate} from "../abc/group_C.js";
import {A_UpdateCommentVote} from "../e/E.js";
import {G_AdditionalDataItem,G_EY_Entity,G_ExtraUrlParamItem,G_Text} from "../ghi/group_G.js";
import {O_DU_Persistence} from "../nop_q/O.js";
import {A_ShareEntityService} from "../nop_q/Popup.js";
import {R_AdFeedback,R_Html5PlaybackOnesieConfig,R_PrefetchHintConfig,R_ReelPlayerOverlay,R_VssLoggingContext,R_WatchEndpointMusicConfig} from "../r/group_R.js";
//#endregion
import {T_EnumStr,T_MutType,T_Signal} from "../stu/group_T.js";
import {D_HideEnclosingContainer,D_LikeApi,D_PlaylistId,D_Thumbnail} from "./group_D.js";
import {DC_Params} from "./group_DC.js";
import {DE_U_ChannelUrl,DE_U_ExternalUrl,DE_U_InternalUrl,DE_U_RedirectUrl,D_UserIdStr,T_IdTemplate} from "./mod_D/DU_T/DU.js";

//#region String Enum
export type DE_AdPlacementKind=T_EnumStr<"AD_PLACEMENT_KIND","END"|"SELF_START"|"START"|"MILLISECONDS">;
export type DE_OpportunityType=T_EnumStr<"OPPORTUNITY_TYPE",T_EnumStr<"ORGANIC",T_EnumStr<"BROWSE"|"WATCH_NEXT","RESPONSE_RECEIVED">>>;
export type DE_IconType_Button=
	|"SETTINGS"|"DELETE"
	|"NOTIFICATIONS_ACTIVE"|"NOTIFICATIONS_NONE"|"NOTIFICATIONS_OFF"
	|"CHEVRON_RIGHT"|"CHEVRON_LEFT"|"REMOVE"|"INFO"|"CLOSE"|"MICROPHONE_ON"
	;
;
export type DE_MP_MenuStyle=T_EnumStr<"MULTI_PAGE_MENU_STYLE_TYPE",
	|"SWITCHER"
	|"CREATION"
	|"NOTIFICATIONS"
	|"ACCOUNT"
>;
//#endregion
//#region Endpoint Data
export type DE_AdditionalDatas={additionalDatas: G_AdditionalDataItem[];};
export type DE_AddToPlaylistService={videoId: string;};
export type DE_AdFeedback={content: R_AdFeedback;};
export type DE_BucketIdentifier={bucketIdentifier: "live_chat"; hack: true;};
export type DE_CreateBackstagePost={createBackstagePostParams: string;};
export type DE_CreateComment={createCommentParams: string;};
export type DE_Feedback_ActionItem=C_FilterChipTransform|A_ReplaceEnclosing;
export type DE_Feedback={feedbackToken: string; uiActions?: D_HideEnclosingContainer; actions?: DE_Feedback_ActionItem[];};
export type DE_GetNotificationMenu={ctoken: string;};
export type DE_Like=DE_LikeIndifferent|DE_LikeLike|DE_LikeDislike;
export type DE_LikeDislike={status: "DISLIKE"; target: D_LikeApi; dislikeParams: string;};
export type DE_LikeIndifferent={status: "INDIFFERENT"; target: D_LikeApi; removeLikeParams?: string;};
export type DE_LikeLike={status: "LIKE"; target: D_LikeApi; actions?: C_MusicLibraryStatusUpdate[]; likeParams?: string;};
export type DE_MuteAd={type: "HIDE"; actions: A_HideEnclosing[];};
export type DE_NotificationOptOut={optOutText: G_Text; serializedOptOut: string; serializedRecordInteractionsRequest: string;};
export type DE_PerformCommentAction={action: string; clientActions: A_UpdateCommentVote[];};
export type DE_PlaylistDelete=D_PlaylistId;
export type DE_PlaylistEdit={actions: GA_Playlist[]; playlistId?: "WL"; params?: string;};
export type DE_PlaylistEditor=D_PlaylistId;
export type DE_RecordNotificationInteractions={serializedInteractionsRequest: string; actions?: A_HideEnclosing[];};
export type DE_Search={params?: string; query: string;};
export type DE_Settings={browseId: "SPaccount_overview";};
export type DE_ShareEntityService={serializedShareEntity: string; commands: A_ShareEntityService[];};
export type DE_ShowEngagementPanel={panelIdentifier: "engagement-panel-searchable-transcript";};
export type DE_SignalNavigation=T_Signal<"CHANNEL_SWITCHER"|"LIVE_CONTROL_ROOM">;
export type DE_SubmitFeedback=T_Signal<"SUBMIT_FEEDBACK">;
export type DE_Subscribe={params: string; channelIds: T_IdTemplate<"UC",D_UserIdStr>[];};
export type DE_SuperThanksSelectedTier={key: string; index: number;};
export type DE_UndoFeedback={undoToken: string; actions: A_UndoFeedback[];};
export type DE_Unsubscribe={params: string; channelIds: T_IdTemplate<"UC",D_UserIdStr>[];};
export type DE_Upload=B_Hack;
export type DE_VE83769_Url_SearchObj={gclid: string;};
export type DE_WatchPlaylist={params: string; playlistId: `RD${string}`; index: 13;};
export type DE_WebPlayerShareEntityService={serializedShareEntity: string;};
export type DE_YpcGetCart={transactionParams: string;};
//#endregion
//#region Endpoint Data Mutation Union
export type DE_MutationDelete={type: T_MutType<"DELETE">; entityKey: string; options: O_DU_Persistence;};
export type DE_MutationReplace={type: T_MutType<"REPLACE">; entityKey: string; payload: G_EY_Entity;};
//#endregion
//#region Long Objects
export type DE_Url=
	|DE_U_InternalUrl
	|DE_U_RedirectUrl
	|DE_U_ExternalUrl
	|DE_U_ChannelUrl
	|DE_U_ExternalUrl_GRU_Open
	;
;
export type DE_U_ExternalUrl_GRU_Open={
	url: `https://support.google.com/youtube?${string}`;
	grwOpenInOverride: "GRW_OPEN_IN_OVERRIDE_USE_PREFERRED_APP_NO_PROMPT";
};
export type DE_VE3832_Watch={
	videoId: string;
	index?: number;
	playlistSetVideoId?: string;
	params?: string;
	startTimeSeconds?: number;
	continuePlayback?: boolean;
	loggingContext?: R_VssLoggingContext;
	watchEndpointSupportedOnesieConfig?: R_Html5PlaybackOnesieConfig;
	watchEndpointSupportedPrefetchConfig?: R_PrefetchHintConfig;
	playerParams?: string;
	watchEndpointMusicSupportedConfigs?: R_WatchEndpointMusicConfig;
	nofollow?: boolean;
	playerExtraUrlParams?: [G_ExtraUrlParamItem];
}|({
	videoId: string;
	index?: number;
	playlistSetVideoId?: string;
	params?: string;
	startTimeSeconds?: number;
	continuePlayback?: boolean;
	loggingContext?: R_VssLoggingContext;
	watchEndpointSupportedOnesieConfig?: R_Html5PlaybackOnesieConfig;
	watchEndpointSupportedPrefetchConfig?: R_PrefetchHintConfig;
	playerParams?: string;
	watchEndpointMusicSupportedConfigs?: R_WatchEndpointMusicConfig;
	nofollow?: boolean;
	playerExtraUrlParams?: [G_ExtraUrlParamItem];
}&D_PlaylistId);
export type DE_ReelWatch={
	videoId?: string;
	playerParams: string;
	thumbnail?: D_Thumbnail;
	overlay: R_ReelPlayerOverlay;
	params: string;
	loggingContext?: D_LoggingContext;
	sequenceProvider?: "REEL_WATCH_SEQUENCE_PROVIDER_RPC";
	inputType?: "REEL_WATCH_INPUT_TYPE_SEEDLESS";
	sequenceParams?: string;
};
export type DE_VE83769_Url_1$d$ad_url2={
	utm_term: "";
	utm_campaign: "DISPLAY campaign for \"web development\" landing page";
	utm_source: "adwords";
	utm_medium: "ppc";
	hsa_acc: `${number}`;
	hsa_cam: `${number}`;
	hsa_grp: `${number}`;
	hsa_ad: `${number}`;
	hsa_src: "d";
	hsa_tgt: "";
	hsa_kw: "";
	hsa_mt: "";
	hsa_net: "adwords";
	hsa_ver: "3";
	gclid: string;
};
export type DE_VE83769_Url_Shape={
	sa: "l";
	ai: string;
	ae: "1";
	num: "1";
	cid: string;
	sig: string;
	client: `ca-pub-${number}`;
	rf: "3";
	adurl: `https://plantagreenhouses.ca/?gclid=${string}`|`https://www.newdawndevelopments.com/service/custom-homes?gclid=${string}&hsa_ver=3&hsa_net=adwords&hsa_mt=&hsa_kw=&hsa_tgt=&hsa_src=d&hsa_ad=${number}&hsa_grp=${number}&hsa_cam=${number}&hsa_acc=${number}&utm_medium=ppc&utm_source=adwords&utm_campaign=DISPLAY+campaign+for+%22web+development%22+landing+page&utm_term=`;
};
export type DE_VE83769_Url_1={
	url: `https://googleads.g.doubleclick.net/aclk?adurl=${string}&rf=3&client=ca-pub-${number}&sig=${string}&cid=${string}&num=1&ae=1&ai=${string}&sa=l`;
	target: "TARGET_NEW_WINDOW";
};
//#endregion
//#region DE (from DC_Params)
export type DE_GetReportForm=DC_Params;
export type DE_GetTranscript=DC_Params;
export type DE_YpcGetOffers=DC_Params;
export type DE_YpcGetOfflineUpsell=DC_Params;
//#endregion
