import {A_GetMultiPageMenu,AU_NotificationsUnseenCount,A_AppendContinuationItems,AU_EngagementPanel,A_AddToGuideSection,A_RemoveFromGuideSection} from "../abc/A.js";
import {B_StateTag} from "../abc/B.js";
import {DC_EntityBatchUpdate} from "../abc/C.js";
import {D_LoggingDirectives,DMD_Badge,DMD_RowContainer} from "../d/group_D.js";
import {D_UserIdStr} from "../d/mod_D/DU_T/DU.js";
import {T_IdTemplate} from "../d/mod_D/DU_T/DU_TemplateString.js";
import {E_RecordNotificationInteractions,E_NotificationOptOut} from "../e/E.js";
import {G_Text,G_SE_MenuService} from "../ghi/_group.mod/G.js";
import {A_NotificationMenuPopup,A_PdgBuyFlow,TA_OpenPopup_Empty,A_NotificationToast} from "../nop_q/Popup.js";
import {T_Icon} from "../stu/mod/group_T.js";
import {RC_ResponseContext,R_Tab,R_ExpandableTab,R_AddToPlaylist,R_SubscriptionNotificationToggleButton} from "./R.js";

export type RCA_RelevantStateTags={relevantStateTags: B_StateTag[];};
export type RD_MenuServiceIconType_1=[
	"NOT_INTERESTED"|"ADD_TO_QUEUE_TAIL",
	"FLAG",
	"CONTENT_CUT",
	"PLAYLIST_ADD",
	"WATCH_LATER",
	"SHARE",
	"REMOVE",
][number];
export type RD_MenuServiceIconType_Sep="SHARE";
export type RD_MenuServiceItem=
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
		hasSeparator: true;
		isDisabled: false;
	};
export type REG_AccountSwitcher={
	responseContext: RC_ResponseContext;
	selectText: G_Text;
	actions: A_GetMultiPageMenu[];
};
export type REG_DatasyncIds={
	responseContext: RC_ResponseContext;
	datasyncIds: (`${number}||${number}`|`${number}||`)[];
};
export type RG_Result=R_Tab|R_ExpandableTab;
export type RMD_Badge={metadataBadgeRenderer: DMD_Badge;};
export type RMD_RowContainer={metadataRowContainerRenderer: DMD_RowContainer;};
export type RRC_ResponseContext={responseContext: RC_ResponseContext;};
export type RSG_AddToPlaylist={
	responseContext: RC_ResponseContext;
	contents: R_AddToPlaylist[];
	trackingParams: string;
};
export type RSG_GetUnseenCount={
	responseContext: RC_ResponseContext;
	actions?: [AU_NotificationsUnseenCount];
	unseenCount?: number;
};
export type RSG_NotificationMenu={
	responseContext: RC_ResponseContext;
	actions: (A_NotificationMenuPopup|A_AppendContinuationItems)[];
	trackingParams: string;
};
export type RSG_PdgBuyFlow={
	responseContext: RC_ResponseContext;
	command: A_PdgBuyFlow;
	trackingParams: string;
	frameworkUpdates: D_FrameworkUpdates;
};
export type RSG_SearchSuggestions={
	responseContext: RC_ResponseContext;
	trackingParams: string;
};
export type RSG_SharePanel={
	responseContext: RC_ResponseContext;
	trackingParams: string;
	actions: TA_OpenPopup_Empty[];
};
export type RSG_Survey={
	responseContext: RC_ResponseContext;
	trackingParams: string;
};
export type RSG_Transcript={
	responseContext: RC_ResponseContext;
	actions: AU_EngagementPanel[];
	trackingParams: string;
};
export type RSL_Dislike={
	responseContext: RC_ResponseContext;
	actions?: TA_OpenPopup_Empty[];
};
export type RSL_Like={
	responseContext: RC_ResponseContext;
	actions?: (TA_OpenPopup_Empty|A_AddToGuideSection)[];
};
export type RSL_RemoveLike={
	responseContext: RC_ResponseContext;
	actions?: (TA_OpenPopup_Empty|A_RemoveFromGuideSection)[];
};

export type RSM_ChannelPreference={
	responseContext: RC_ResponseContext;
	actions: A_NotificationToast[];
	channelId: T_IdTemplate<"UC",D_UserIdStr>;
	newNotificationButton: R_SubscriptionNotificationToggleButton;
	trackingParams: string;
	frameworkUpdates: DC_EntityBatchUpdate;
};