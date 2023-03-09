type D_ToggleButton_ToggledSrvEP=E_RemoveUpcomingEventReminder|E_SignalService_SendPost|E_PerformCommentAction|E_Like|C_CommandExecutor;

type D_ToggleButton_DefaultSrvEP=E_AddUpcomingEventReminder|E_SignalService_SendPost|E_PerformCommentAction|C_RepeatChapter|C_CommandExecutor;

type D_ToggleButton={
	style?: T_StyleType<"STYLE_COMPACT_GRAY"|"STYLE_TEXT"|"STYLE_GREY_TEXT"|"STYLE_DEFAULT_ACTIVE">;
	isToggled?: boolean;
	isDisabled?: false;
	defaultText: G_Text;
	defaultServiceEndpoint?: D_ToggleButton_DefaultSrvEP;
	toggledText: G_Text;
	toggledServiceEndpoint?: D_ToggleButton_ToggledSrvEP;
	defaultTooltip?: string;
	toggledStyle?: T_StyleType<"STYLE_COMPACT_GRAY"|"STYLE_DEFAULT_ACTIVE"|"STYLE_BLUE_TEXT">;
	accessibility?: D_Label;
	trackingParams: string;
	accessibilityData?: D_Accessibility;
	defaultIcon?: T_Icon<"DISLIKE"|"LIKE"|"LOOP"|"SHUFFLE">;
	size?: T_SizeType<"SIZE_DEFAULT">;
	targetId?: "watch-dislike"|"watch-like";
	toggleButtonSupportedData?: R_ToggleButtonIdData;
	toggledAccessibilityData?: D_Accessibility;
	toggledTooltip?: string;
};
