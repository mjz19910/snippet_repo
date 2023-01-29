namespace D_NotificationTopbarButton$updateUnseenCountEndpoint {
	export type Gen1=Extract<{signal: "GET_NOTIFICATIONS_MENU"; actions: TA_OpenPopup<{popup: TR_MP_Menu<{trackingParams: string; style: "MULTI_PAGE_MENU_STYLE_TYPE_NOTIFICATIONS"; showLoadingSpinner: true;}>; popupType: "DROPDOWN"; beReused: true;}>[];},any>;

	export type D_NotificationTopbarButton$Icon={
		icon: T_Icon<"NOTIFICATIONS">;

		menuRequest: T_SE_Signal<{webCommandMetadata: {sendPost: true; apiUrl: "/youtubei/v1/notification/get_notification_menu";};},{signal: "GET_NOTIFICATIONS_MENU"; actions: TA_OpenPopup<{popup: TR_MP_Menu<{trackingParams: string; style: "MULTI_PAGE_MENU_STYLE_TYPE_NOTIFICATIONS"; showLoadingSpinner: true;}>; popupType: "DROPDOWN"; beReused: true;}>[];}>;
		style: "NOTIFICATION_BUTTON_STYLE_TYPE_DEFAULT";
		trackingParams: string;
		accessibility: D_Accessibility;
		tooltip: "Notifications";
		updateUnseenCountEndpoint: T_SE_Signal<{webCommandMetadata: {sendPost: true; apiUrl: "/youtubei/v1/notification/get_unseen_count";};},{signal: "GET_UNSEEN_NOTIFICATION_COUNT";}>;
		notificationCount: 0;
		handlerDatas: "NOTIFICATION_ACTION_UPDATE_UNSEEN_COUNT"[];
	};
}
