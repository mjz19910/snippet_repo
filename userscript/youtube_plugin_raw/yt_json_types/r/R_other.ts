type RCA_RelevantStateTags={relevantStateTags: B_StateTag[];};
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
		hasSeparator: true;
		isDisabled: false;
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
	actions?: [AU_NotificationsUnseenCount];
	unseenCount?: number;
};
type RSG_NotificationMenu={
	responseContext: RC_ResponseContext;
	actions: A_NotificationMenuPopup[];
	trackingParams: string;
};
type RSG_PdgBuyFlow={
	responseContext: RC_ResponseContext;
	command: A_PdgBuyFlow;
	trackingParams: string;
	frameworkUpdates: D_FrameworkUpdates;
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
	actions: AU_EngagementPanel[];
	trackingParams: string;
};
type RSL_Dislike={
	responseContext: RC_ResponseContext;
	actions?: TA_OpenPopup_Empty[];
};
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
	actions: A_NotificationToast[];
	channelId: DU_Channel_Id;
	newNotificationButton: R_SubscriptionNotificationToggleButton;
	trackingParams: string;
	frameworkUpdates: DC_EntityBatchUpdate;
};