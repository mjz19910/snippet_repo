type NotificationTopbarButtonData={
	icon: Icon<"NOTIFICATIONS">;
	menuRequest: SignalServiceEndpoint;
	style: "NOTIFICATION_BUTTON_STYLE_TYPE_DEFAULT";
	trackingParams: string;
	accessibility: Accessibility;
	tooltip: string;
	updateUnseenCountEndpoint: SignalServiceEndpoint;
	notificationCount: number;
	handlerDatas: ["NOTIFICATION_ACTION_UPDATE_UNSEEN_COUNT"];
};