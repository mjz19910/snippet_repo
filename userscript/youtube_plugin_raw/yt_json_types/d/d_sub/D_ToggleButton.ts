type D_Button_DefServiceEP=C_CommandExecutor|E_PerformCommentAction;
type GM_AddUpcomingEventReminder={
	sendPost: true;
	apiUrl: "/youtubei/v1/notification/add_upcoming_event_reminder";
};

type M_AddUpcomingEventReminder={webCommandMetadata: GM_AddUpcomingEventReminder;};
type GM_RemoveUpcomingEventReminder={
	sendPost: true;
	apiUrl: "/youtubei/v1/notification/remove_upcoming_event_reminder";
};

type M_RemoveUpcomingEventReminder={webCommandMetadata: GM_RemoveUpcomingEventReminder;};


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
