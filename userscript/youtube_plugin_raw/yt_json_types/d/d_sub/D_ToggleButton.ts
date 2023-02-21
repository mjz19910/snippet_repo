type E_PerformCommentAction={performCommentActionEndpoint: {};};
type D_Button_DefServiceEP=C_CommandExecutor|E_PerformCommentAction;
type GM_notification_add_upcoming_event_reminder={
	sendPost: true;
	apiUrl: "/youtubei/v1/notification/add_upcoming_event_reminder";
};

type M_notification_add_upcoming_event_reminder={webCommandMetadata: GM_notification_add_upcoming_event_reminder;};
type E_AddUpcomingEventReminder={
	clickTrackingParams: string;
	commandMetadata: M_notification_add_upcoming_event_reminder;
	addUpcomingEventReminderEndpoint: DC_Params;
};
type GM_notification_remove_upcoming_event_reminder={
	sendPost: true;
	apiUrl: "/youtubei/v1/notification/remove_upcoming_event_reminder";
};

type M_notification_remove_upcoming_event_reminder={webCommandMetadata: GM_notification_remove_upcoming_event_reminder;};

type E_RemoveUpcomingEventReminder={
	clickTrackingParams: string;
	commandMetadata: M_notification_remove_upcoming_event_reminder;
	removeUpcomingEventReminderEndpoint: DC_Params;
};

type D_ToggleButton={
	style: T_StyleType<"STYLE_COMPACT_GRAY"|"STYLE_TEXT"|"STYLE_GREY_TEXT"|"STYLE_DEFAULT_ACTIVE">;
	isToggled: boolean;
	isDisabled: false;
	defaultText: G_Text;
	defaultServiceEndpoint: E_AddUpcomingEventReminder|E_SignalService_SendPost|E_PerformCommentAction|C_RepeatChapter|C_CommandExecutor;
	toggledText: G_Text;
	toggledServiceEndpoint: E_RemoveUpcomingEventReminder|E_SignalService_SendPost|E_PerformCommentAction|E_Like|C_CommandExecutor;
	trackingParams: string;
	defaultTooltip: string;
	toggledStyle: T_StyleType<"STYLE_COMPACT_GRAY"|"STYLE_DEFAULT_ACTIVE"|"STYLE_BLUE_TEXT">;
	accessibility: D_Label;
	accessibilityData: D_Accessibility;
	defaultIcon: T_Icon<"DISLIKE"|"LIKE"|"LOOP"|"SHUFFLE">;
	size: T_SizeType<"SIZE_DEFAULT">;
	targetId: "watch-dislike"|"watch-like";
	toggleButtonSupportedData: R_ToggleButtonIdData;
	toggledAccessibilityData: D_Accessibility;
	toggledTooltip: string;
};
