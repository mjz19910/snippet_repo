// cSpell:ignoreRegExp /(?<=")[^"]{40,}/

type D_Button=
	D_Button_2
	|{
		style: "STYLE_DEFAULT";
		size: "SIZE_DEFAULT";
		isDisabled: false;
		icon: T_Icon<"CLOSE">;
		trackingParams: string;
		accessibilityData: TD_Accessibility<"Close">;
		command: TA_OpenPopup<{popup: R_ConfirmDialog; popupType: "DIALOG";}>;
	}|{
		trackingParams: string;
		command: T_SE_Signal<{webCommandMetadata: {sendPost: true;};},G_ClientSignal>;
	}|{
		style: "STYLE_DEFAULT";
		size: "SIZE_DEFAULT";
		isDisabled: false;
		text: G_Text;
		icon: T_Icon<"CONTENT_CUT">;
		tooltip: "Clip";
		trackingParams: string;
		accessibilityData: TD_Accessibility<"Clip">;
		targetId: "create-clip-button-action-bar";
		command: A_ChangeEngagementPanelVisibility;
	}
	|{
		style: "STYLE_TEXT";
		size: "SIZE_DEFAULT";
		isDisabled: false;
		icon: T_Icon<"NOTIFICATIONS_NONE">;
		accessibility: TD_Label<"Current setting is personalised notifications. Tap to change your notification setting for ScarletFlameFlandre">;
		trackingParams: string;
		accessibilityData: TD_Accessibility<"Current setting is personalised notifications. Tap to change your notification setting for ScarletFlameFlandre">;
	}
	;
;

type R_Button={buttonRenderer: D_Button;};