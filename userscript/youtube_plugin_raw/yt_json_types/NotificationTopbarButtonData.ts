type NotificationTopbarButtonData={
	icon: Icon<"NOTIFICATIONS">;
	menuRequest: E_SignalServiceEndpoint;
	style: "NOTIFICATION_BUTTON_STYLE_TYPE_DEFAULT";
	trackingParams: string;
	accessibility: Accessibility;
	tooltip: string;
	updateUnseenCountEndpoint: E_SignalServiceEndpoint;
	notificationCount: number;
	handlerDatas: ["NOTIFICATION_ACTION_UPDATE_UNSEEN_COUNT"];
};