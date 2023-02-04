// cSpell:ignoreRegExp /(?<=")[^"]{40,}/
type D_Button=
	|never
	|{
		style: "STYLE_DEFAULT";
		size: "SIZE_DEFAULT";
		isDisabled: false;
		icon: T_Icon<"CHEVRON_LEFT">;
		tooltip: "Previous";
		trackingParams: string;
		accessibilityData: TD_Accessibility<"Previous">;
	}
	|{
		style: "STYLE_DEFAULT";
		size: "SIZE_DEFAULT";
		isDisabled: false;
		icon: T_Icon<"CHEVRON_RIGHT">;
		tooltip: "Next";
		trackingParams: string;
		accessibilityData: TD_Accessibility<"Next">;
	}
	|{
		style: "STYLE_OPACITY";
		size: "SIZE_DEFAULT";
		isDisabled: false;
		icon: T_Icon<"SHARE">;
		navigationEndpoint: E_ShareEntityService;
		tooltip: "Share";
		trackingParams: string;
	}
	|{
		style: "STYLE_DEFAULT";
		size: "SIZE_DEFAULT";
		isDisabled: false;
		text: G_Text;
		icon: T_Icon<"PLAYLIST_ADD">;
		accessibility: TD_Label<"Save to">;
		tooltip: "Save";
		trackingParams: string;
		accessibilityData: TD_Accessibility<"Save to playlist">;
		command: E_AddToPlaylistService;
	}
	|{
		style: "STYLE_DEFAULT";
		size: "SIZE_DEFAULT";
		isDisabled: false;
		icon: T_Icon<"LOOP_ONE_ACTIVE">;
		tooltip: "Turn off loop";
		trackingParams: string;
		accessibilityData: TD_Accessibility<"Turn off loop">;
		command: C_CommandExecutor;
	}
	|{
		style: "STYLE_DEFAULT";
		size: "SIZE_DEFAULT";
		isDisabled: false;
		icon: T_Icon<"LOOP_ACTIVE">;
		tooltip: "Loop video";
		trackingParams: string;
		accessibilityData: TD_Accessibility<"Loop video">;
		command: C_CommandExecutor;
	}
	|{
		style: "STYLE_DEFAULT";
		size: "SIZE_DEFAULT";
		isDisabled: false;
		icon: T_Icon<"LOOP">;
		tooltip: "Loop playlist";
		trackingParams: string;
		accessibilityData: TD_Accessibility<"Loop playlist">;
		command: C_CommandExecutor;
	}
	|{
		style: "STYLE_DEFAULT";
		size: "SIZE_DEFAULT";
		isDisabled: false;
		text: G_Text;
		serviceEndpoint: C_GetPdgBuyFlow;
		icon: T_Icon<"MONEY_HEART">;
		tooltip: "Show support with Super Thanks";
		trackingParams: string;
		accessibilityData: TD_Accessibility<"Thanks">;
		targetId: "watch-supervod-button";
	}
	|{
		style: "STYLE_DEFAULT";
		size: "SIZE_DEFAULT";
		isDisabled: false;
		icon: T_Icon<"SETTINGS">;
		navigationEndpoint: GE_Browse;
		tooltip: "Settings";
		trackingParams: string;
		accessibilityData: TD_Accessibility<"Settings">;
	}
	|{
		style: "STYLE_OPACITY";
		size: "SIZE_DEFAULT";
		icon: T_Icon<"EXPAND">;
		accessibility: TD_Label<"Show more">;
		tooltip: "Show more";
		trackingParams: string;
	}
	|{
		style: "STYLE_OPACITY";
		size: "SIZE_DEFAULT";
		isDisabled: false;
		serviceEndpoint: E_Feedback;
		icon: T_Icon<"DISMISSAL">;
		tooltip: "Not interested";
		trackingParams: string;
		accessibilityData: TD_Accessibility<"Not interested">;
	}
	|{
		style: "STYLE_DEFAULT";
		size: "SIZE_DEFAULT";
		isDisabled: false;
		navigationEndpoint: E_Watch;
		accessibility: TD_Label<"Play next video">;
		trackingParams: string;
		accessibilityData: TD_Accessibility<"Play next video">;
	}
	|{
		style: "STYLE_TEXT";
		size: "SIZE_DEFAULT";
		isDisabled: false;
		icon: T_Icon<"NOTIFICATIONS_NONE"|"NOTIFICATIONS_OFF"|"NOTIFICATIONS_ACTIVE">;
		accessibility: TD_Label<"Current setting is personalised notifications. Tap to change your notification setting for ScarletFlameFlandre">;
		trackingParams: string;
		accessibilityData: TD_Accessibility<"Current setting is personalised notifications. Tap to change your notification setting for ScarletFlameFlandre">;
	}
	|{
		style: "STYLE_DEFAULT";
		size: "SIZE_DEFAULT";
		isDisabled: false;
		serviceEndpoint: E_SignalService_SendPost;
		icon: T_Icon<"MICROPHONE_ON">;
		tooltip: "Search with your voice";
		trackingParams: string;
		accessibilityData: TD_Accessibility<"Search with your voice">;
	}
	|{
		style: "STYLE_BLUE_TEXT";
		size: "SIZE_DEFAULT";
		isDisabled: false;
		text: G_Text;
		trackingParams: string;
	}
	|{
		style: "STYLE_DEFAULT";
		size: "SIZE_DEFAULT";
		isDisabled: false;
		icon: T_Icon<"CHEVRON_RIGHT">;
		accessibility: TD_Label<"Next">;
		trackingParams: string;
	}
	|{
		style: "STYLE_DEFAULT";
		size: "SIZE_DEFAULT";
		isDisabled: false;
		icon: T_Icon<"CHEVRON_LEFT">;
		accessibility: TD_Label<"Previous">;
		trackingParams: string;
	}
	|{
		style: "STYLE_DEFAULT";
		size: "SIZE_DEFAULT";
		isDisabled: false;
		icon: T_Icon<"REMOVE">;
		accessibility: TD_Label<"Cancel auto-play for this video">;
		trackingParams: string;
	}
	|{
		style: "STYLE_DEFAULT";
		size: "SIZE_DEFAULT";
		isDisabled: false;
		icon: T_Icon<"CLOSE">;
		trackingParams: string;
		accessibilityData: TD_Accessibility<"Close">;
		command: TA_OpenPopup<Popup_ConfirmDialog>;
	}
	|D_Button_2
	|{
		style: "STYLE_DEFAULT";
		size: "SIZE_DEFAULT";
		isDisabled: false;
		icon: T_Icon<"CLOSE">;
		trackingParams: string;
		accessibilityData: TD_Accessibility<"Close">;
		command: TA_OpenPopup<Popup_ConfirmDialog>;
	}
	|{
		trackingParams: string;
		command: E_SignalService_SendPost;
	}
	|D_Button_With_TargetId
	;
;

type R_Button={buttonRenderer: D_Button;};