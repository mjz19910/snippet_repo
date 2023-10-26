import {D_Enum_GuideAction,D_EngagementPanelTargetId,D_EngagementPanelVisibility,D_Thumbnail,D_UserIdStr,R_Button,T_IdTemplate} from "../d/group_D.ts";
import {G_ChatItem,G_Text,G_WatchNext} from "../ghi/group_G.ts";
import {TR_MultiPageMenu_Empty,A_ConfirmDialog} from "../nop_q/Popup.ts";
import {R_GuideEntry,R_NotificationText,RA_ReelDismissal,RA_NotificationMulti,R_ChannelSwitcherPage,R_Transcript,R_VideoViewCount,RA_Notification} from "../r/group_R.ts";
import {SU_SignalStr} from "../stu/group_S.ts";
import {TB_ContinuationItemMap,T_Item,T_Items,T_Menu,T_Page} from "../stu/group_T.ts";
import {TA_CreateObjectFromContinuationMap,A_AddChatItem} from "./A.ts";
import {B_Hack} from "./group_B.ts";

//#region Action data
export type AD_AddChatItem={item: G_ChatItem; clientId?: string;};
export type AD_AddToGuideSection=T_Items<R_GuideEntry>&{handlerData: D_Enum_GuideAction;};
export type AD_AppendContinuationItems=TA_CreateObjectFromContinuationMap<TB_ContinuationItemMap>;
export type AD_ChangeEngagementPanelVisibility={targetId: D_EngagementPanelTargetId; visibility: D_EngagementPanelVisibility;};
export type AD_DateText={dateText: G_Text;};
export type AD_Description={description: G_Text;};
export type AD_GetMultiPageMenu=T_Menu<TR_MultiPageMenu_Empty>;
export type AD_HideEnclosing={notificationId: `${number}`;};
export type AD_HideEngagementPanelTargetId={engagementPanelTargetId: "engagement-panel-clip-create";};
export type AD_RemoveFromGuideSection={handlerData: "GUIDE_ACTION_REMOVE_FROM_PLAYLISTS"; guideEntryId: T_IdTemplate<"RD">;};
export type AD_ReplaceEnclosing_Item=R_NotificationText|RA_ReelDismissal|RA_NotificationMulti;
export type AD_ReplaceEnclosing=T_Item<AD_ReplaceEnclosing_Item>;
export type AD_ReplayChatItem={actions: A_AddChatItem[]; videoOffsetTimeMsec: `${number}`;};
export type AD_SendFeedback={bucket: "Kevlar";};
export type AD_SetActivePanelItem={panelTargetId: "engagement-panel-macro-markers-auto-chapters"; itemIndex: number;};
export type AD_ShowEngagementPanelScrim={engagementPanelTargetId: "engagement-panel-clip-create"; onClickCommands: A_ConfirmDialog[];};
export type AD_Signal={signal: SU_SignalStr;};
export type AD_SubscribeButton={subscribed: true; channelId: T_IdTemplate<"UC",D_UserIdStr>;};
export type AD_Title={title: G_Text;};
export type AD_ToggleButtonText={buttonId: "TOGGLE_BUTTON_ID_TYPE_LIKE"; defaultText: G_Text; toggledText: G_Text;};
export type AD_UndoFeedback=B_Hack;
export type AD_UpdateChannelSwitcherPage=T_Page<R_ChannelSwitcherPage>;
export type AD_UpdateEngagementPanel={targetId: "engagement-panel-searchable-transcript"; content: R_Transcript;};
export type AD_UpdateNotificationsUnseenCount={handlerData: "NOTIFICATION_ACTION_UPDATE_UNSEEN_COUNT"; unseenCount: number; timeoutMs: number;};
export type AD_ViewCount={viewCount: R_VideoViewCount;};
export type AD_WatchNextContinuation=G_WatchNext;
//#endregion
export type AD_ReelDismissal={trackingParams: string; onDismissalCompletionRenderer: RA_Notification;};
export type AD_Notification={trackingParams: string; responseText: G_Text; actionButton?: R_Button;};
export type AD_AccountItem={
	accountName: G_Text;
	accountPhoto: D_Thumbnail;
	isSelected: boolean;
	isDisabled: boolean;
	hasChannel: boolean;
	serviceEndpoint: {};
	accountByline: G_Text;
	channelHandle: G_Text;
};
export type AD_AddToToast={item: R_NotificationText;};

//#region AD_NotificationMulti
export type AD_NotificationMulti={
	responseText: G_Text;
	buttons: R_Button[];
	trackingParams: string;
};
//#endregion
