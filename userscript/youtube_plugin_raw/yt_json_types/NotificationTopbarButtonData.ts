type NotificationTopbarButtonData={
	icon: Icon<"NOTIFICATIONS">;
	style: "NOTIFICATION_BUTTON_STYLE_TYPE_DEFAULT";
	menuRequest: {};
	trackingParams: string;
	accessibility: AccessibilityData;
	tooltip: string;
	updateUnseenCountEndpoint: {};
	notificationCount: number;
	handlerDatas: ["NOTIFICATION_ACTION_UPDATE_UNSEEN_COUNT"];
};