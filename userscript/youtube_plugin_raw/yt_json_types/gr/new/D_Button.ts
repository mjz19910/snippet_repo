// cSpell:ignoreRegExp /(?<=")[^"]{40,}/

type D_Button=
	|{
		style: "STYLE_TEXT";
		size: "SIZE_DEFAULT";
		isDisabled: false;
		icon: T_Icon<"NOTIFICATIONS_NONE">;
		accessibility: TD_Label<"Current setting is personalised notifications. Tap to change your notification setting for ScarletFlameFlandre">;
		trackingParams: string;
		accessibilityData: TD_Accessibility<"Current setting is personalised notifications. Tap to change your notification setting for ScarletFlameFlandre">;
	}|{
		style: "STYLE_TEXT";
		size: "SIZE_DEFAULT";
		isDisabled: false;
		icon: T_Icon<"NOTIFICATIONS_OFF">;
		accessibility: TD_Label<"Current setting is to receive no notifications. Tap to change your notification setting for ScarletFlameFlandre">;
		trackingParams: string;
		accessibilityData: TD_Accessibility<"Current setting is to receive no notifications. Tap to change your notification setting for ScarletFlameFlandre">;
	}|{
		style: "STYLE_DEFAULT";
		size: "SIZE_DEFAULT";
		isDisabled: false;
		icon: T_Icon<"CHEVRON_RIGHT">;
		accessibility: TD_Label<"Next">;
		trackingParams: string;
	}|{
		style: "STYLE_DEFAULT";
		size: "SIZE_DEFAULT";
		isDisabled: false;
		icon: T_Icon<"CHEVRON_LEFT">;
		accessibility: TD_Label<"Previous">;
		trackingParams: string;
	}|{
		style: "STYLE_DEFAULT";
		size: "SIZE_DEFAULT";
		isDisabled: false;
		icon: T_Icon<"REMOVE">;
		accessibility: TD_Label<"Cancel auto-play for this video">;
		trackingParams: string;
	}|{
		style: "STYLE_DEFAULT";
		size: "SIZE_DEFAULT";
		isDisabled: false;
		icon: T_Icon<"CLOSE">;
		trackingParams: string;
		accessibilityData: TD_Accessibility<"Close">;
		command: TA_OpenPopup<{popup: R_ConfirmDialog; popupType: "DIALOG";}>;
	}|
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