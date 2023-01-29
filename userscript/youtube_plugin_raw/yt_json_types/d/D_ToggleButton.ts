type DC_CommandExecutor={
	commands: (C_UpdateToggleButtonState|E_Like)[];
};
type C_CommandExecutor={
	clickTrackingParams: string;
	commandExecutorCommand: DC_CommandExecutor;
};
type T_Id<T>={id: T;};
type D_ToggleButtonIdData={toggleButtonIdData: T_Id<"TOGGLE_BUTTON_ID_TYPE_LIKE">;};

type D_ToggleButton={
	style: T_StyleType<"STYLE_TEXT">;
	isToggled: false;
	isDisabled: false;
	defaultIcon: T_Icon<"LIKE"|"DISLIKE"|"LOOP">;
	defaultText: G_Text;
	defaultServiceEndpoint: C_CommandExecutor;
	toggledText: G_Text;
	toggledServiceEndpoint: E_Like;
	accessibility: D_Label;
	trackingParams: string;
	defaultTooltip: string;
	toggledTooltip: string;
	toggledStyle: T_StyleType<"STYLE_DEFAULT_ACTIVE">;
	accessibilityData: D_Accessibility;
	toggleButtonSupportedData: D_ToggleButtonIdData;
	targetId: "watch-like"|"watch-dislike";
};