type E_PerformCommentAction={performCommentActionEndpoint: {};};
type D_Button_DefServiceEP=C_CommandExecutor|E_PerformCommentAction;
type D_ToggleButton=
	|never
	|{
		defaultText: G_Text;
		toggledText: G_Text;
		trackingParams: string;
	}
	|{
		style: T_StyleType<"STYLE_TEXT">;
		size: T_SizeType<"SIZE_DEFAULT">;
		isToggled: false;
		isDisabled: false;
		defaultIcon: T_Icon<"LIKE">;
		defaultServiceEndpoint: E_PerformCommentAction;
		toggledServiceEndpoint: E_PerformCommentAction;
		trackingParams: string;
		defaultTooltip: "Like";
		toggledTooltip: "Unlike";
		toggledStyle: T_StyleType<"STYLE_DEFAULT_ACTIVE">;
		accessibilityData: TD_Accessibility<"Like this reply along with 64 other people">;
		toggledAccessibilityData: TD_Accessibility<"Unlike">;
	}
	|{
		style: T_StyleType<"STYLE_TEXT">;
		isToggled: boolean;
		isDisabled: false;
		defaultIcon: T_Icon<"LIKE">;
		defaultText: G_Text;
		defaultServiceEndpoint: C_CommandExecutor;
		toggledText: G_Text;
		toggledServiceEndpoint: E_Like;
		accessibility: TD_Label<"like this video along with 7,468 other people">;
		trackingParams: string;
		defaultTooltip: "I like this";
		toggledTooltip: "Unlike";
		toggledStyle: T_StyleType<"STYLE_DEFAULT_ACTIVE">;
		accessibilityData: TD_Accessibility<"like this video along with 7,468 other people">;
		toggleButtonSupportedData: R_ToggleButtonIdData;
		targetId: "watch-like";
	}
	|{
		style: T_StyleType<"STYLE_GREY_TEXT">;
		size: T_SizeType<"SIZE_DEFAULT">;
		isToggled: false;
		isDisabled: false;
		defaultIcon: T_Icon<"SHUFFLE">;
		defaultServiceEndpoint: E_SignalService_SendPost;
		toggledServiceEndpoint: E_SignalService_SendPost;
		accessibility: TD_Label<"Shuffle playlist">;
		trackingParams: string;
		defaultTooltip: "Shuffle playlist";
		toggledTooltip: "Shuffle playlist";
		toggledStyle: T_StyleType<"STYLE_DEFAULT_ACTIVE">;
	}
	|{
		style: T_StyleType<"STYLE_DEFAULT_ACTIVE">;
		isToggled: false;
		isDisabled: false;
		defaultIcon: T_Icon<"LOOP">;
		defaultServiceEndpoint: C_RepeatChapter;
		toggledServiceEndpoint: C_CommandExecutor;
		trackingParams: string;
		toggledStyle: T_StyleType<"STYLE_BLUE_TEXT">;
		accessibilityData: TD_Accessibility<"Repeat chapter is off">;
		toggledAccessibilityData: TD_Accessibility<"Repeat chapter is on">;
	}
	|{
		style: T_StyleType<"STYLE_TEXT">;
		isToggled: false;
		isDisabled: false;
		defaultIcon: T_Icon<"DISLIKE">;
		defaultServiceEndpoint: C_CommandExecutor;
		toggledServiceEndpoint: E_Like;
		accessibility: TD_Label<"Dislike this video">;
		trackingParams: string;
		defaultTooltip: "I dislike this";
		toggledTooltip: "I dislike this";
		toggledStyle: T_StyleType<"STYLE_DEFAULT_ACTIVE">;
		accessibilityData: TD_Accessibility<"Dislike this video">;
		toggleButtonSupportedData: R_ToggleButtonIdData;
		targetId: "watch-dislike";
	}
	;
;