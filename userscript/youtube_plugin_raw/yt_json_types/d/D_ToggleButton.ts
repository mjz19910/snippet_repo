type DC_CommandExecutor={
	commands: (C_UpdateToggleButtonState|E_Like)[];
};
type C_CommandExecutor={
	clickTrackingParams: string;
	commandExecutorCommand: DC_CommandExecutor;
};

type D_ToggleButton={
	style: T_StyleType<"STYLE_TEXT">;
	isToggled: false;
	isDisabled: false;
	defaultIcon: T_Icon<"LIKE">;
	defaultText: R_SimpleText;
	defaultServiceEndpoint: C_CommandExecutor;
	toggledText: R_SimpleText;
	toggledServiceEndpoint: E_Like;
	accessibility: {
		label: "like this video along with 7,438 other people";
	};
	trackingParams: string;
	defaultTooltip: "I like this";
	toggledTooltip: "Unlike";
	toggledStyle: T_StyleType<"STYLE_DEFAULT_ACTIVE">;
	accessibilityData: D_Accessibility;
	toggleButtonSupportedData: {
		toggleButtonIdData: {
			id: "TOGGLE_BUTTON_ID_TYPE_LIKE";
		};
	};
	targetId: "watch-like";
};