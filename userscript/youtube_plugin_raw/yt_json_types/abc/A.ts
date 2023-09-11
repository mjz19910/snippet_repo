import {D_Survey_Watch,D_PaidDigitalGoods} from "../d/group_D/D.js";
import {DC_GetDownload} from "../d/group_D/DC.js";
import {TE_Endpoint_1_Generic,TE_Endpoint_2,TE_Endpoint_1} from "../stu/mod/group_T.js";
import {AD_AccountItem,AD_AddChatItem,AD_AddToGuideSection,AD_AddToToast,AD_AppendContinuationItems,AD_ChangeEngagementPanelVisibility,AD_GetMultiPageMenu,AD_HideEnclosing,AD_HideEngagementPanelTargetId,AD_RemoveFromGuideSection,AD_ReplaceEnclosing,AD_ReplayChatItem,AD_SendFeedback,AD_SetActivePanelItem,AD_ShowEngagementPanelScrim,AD_Signal,AD_UndoFeedback,AD_WatchNextContinuation,AD_UpdateChannelSwitcherPage,AD_DateText,AD_Description,AD_UpdateEngagementPanel,AD_UpdateNotificationsUnseenCount,AD_SubscribeButton,AD_Title,AD_ToggleButtonText,AD_ViewCount} from "./AD.js";

//#region TA_
export type TA_Continuation<T_TargetId,T_ItemType>={targetId: T_TargetId; continuationItems: T_ItemType[];};
export type TA_CreateObjectFromContinuationMap<T>={[E in keyof T]: TA_Continuation<E,T[E]>}[keyof T];
//#endregion
//#region Endpoint Actions
export type A_AccountItem=TE_Endpoint_1_Generic<"accountItem",AD_AccountItem>;
export type A_AddChatItem={
	clickTrackingParams?: string;
	addChatItemAction: AD_AddChatItem;
};
export type A_AddToGuideSection=TE_Endpoint_2<"addToGuideSectionAction",AD_AddToGuideSection>;
export type A_AddToToast=TE_Endpoint_2<"addToToastAction",AD_AddToToast>;
export type A_AppendContinuationItems=TE_Endpoint_2<"appendContinuationItemsAction",AD_AppendContinuationItems>;
export type A_ChangeEngagementPanelVisibility=TE_Endpoint_2<"changeEngagementPanelVisibilityAction",AD_ChangeEngagementPanelVisibility>;
export type A_GetMultiPageMenu=TE_Endpoint_1<"getMultiPageMenuAction",AD_GetMultiPageMenu>;
export type A_HideEnclosing=TE_Endpoint_2<"hideEnclosingAction",AD_HideEnclosing>;
export type A_HideEngagementPanelScrim=TE_Endpoint_2<"hideEngagementPanelScrimAction",AD_HideEngagementPanelTargetId>;
export type A_RemoveFromGuideSection=TE_Endpoint_2<"removeFromGuideSectionAction",AD_RemoveFromGuideSection>;
export type A_ReplaceEnclosing=TE_Endpoint_2<"replaceEnclosingAction",AD_ReplaceEnclosing>;
export type A_ReplayChatItem=TE_Endpoint_1<"replayChatItemAction",AD_ReplayChatItem>;
export type A_SendFeedback=TE_Endpoint_2<"sendFeedbackAction",AD_SendFeedback>;
export type A_SetActivePanelItem=TE_Endpoint_2<"setActivePanelItemAction",AD_SetActivePanelItem>;
export type A_ShowEngagementPanelScrim=TE_Endpoint_2<"showEngagementPanelScrimAction",AD_ShowEngagementPanelScrim>;
export type A_Signal=TE_Endpoint_2<"signalAction",AD_Signal>;
export type A_UndoFeedback=TE_Endpoint_2<"undoFeedbackAction",AD_UndoFeedback>;
export type A_WatchNextContinuation=TA_Continuation<"watch-next-feed",AD_WatchNextContinuation>;
//#region Actions
export type A_AddVideo={action: "ACTION_ADD_VIDEO"; addedVideoId?: string;};
export type A_CopyFromPlaylist={action: "ACTION_COPY_FROM_PLAYLIST"; sourcePlaylistId: "WL";};
export type A_GetSurvey={action: "SURVEY_TRIGGER_ACTION_AUTOPLAY_CANCEL"; endpoint: D_Survey_Watch|D_PaidDigitalGoods;};
export type A_RemoveVideoByVideoId={action: "ACTION_REMOVE_VIDEO_BY_VIDEO_ID"; removedVideoId: string;};
export type AS_PlaylistDescription={action: "ACTION_SET_PLAYLIST_DESCRIPTION"; playlistDescription?: string;};
export type AS_PlaylistName={action: "ACTION_SET_PLAYLIST_NAME"; playlistName?: string;};
export type AS_PlaylistPrivacy={action: "ACTION_SET_PLAYLIST_PRIVACY"; playlistPrivacy?: "UNLISTED";};
export type AS_PlaylistVideoOrder={action: "ACTION_SET_PLAYLIST_VIDEO_ORDER";};
export type GA_Playlist=
	|A_AddVideo
	|A_CopyFromPlaylist
	|A_RemoveVideoByVideoId
	|AS_PlaylistDescription
	|AS_PlaylistName
	|AS_PlaylistPrivacy
	|AS_PlaylistVideoOrder
	;
;
//#endregion
//#region AU_
export type AU_ChannelSwitcherPage={updateChannelSwitcherPageAction: AD_UpdateChannelSwitcherPage;};
export type AU_DateText={updateDateTextAction: AD_DateText;};
export type AU_Description={updateDescriptionAction: AD_Description;};
export type AU_EngagementPanel={clickTrackingParams: string; updateEngagementPanelAction: AD_UpdateEngagementPanel;};
export type AU_NotificationsUnseenCount={clickTrackingParams: string; updateNotificationsUnseenCountAction: AD_UpdateNotificationsUnseenCount;};
export type AU_SubscribeButton={
	clickTrackingParams?: string|undefined;
	updateSubscribeButtonAction: AD_SubscribeButton;
};
export type AU_Title={updateTitleAction: AD_Title;};
export type AU_ToggleButtonText={updateToggleButtonTextAction: AD_ToggleButtonText;};
export type AU_Viewership={updateViewershipAction: AD_ViewCount;};
//#endregion

export type AC_GetDownload={
	clickTrackingParams: string;
	getDownloadActionCommand: DC_GetDownload;
};
