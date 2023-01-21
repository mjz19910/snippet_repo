type NotificationTopbarButtonData={
	icon: Icon<"NOTIFICATIONS">;
	menuRequest: E$SignalServiceEndpoint;
	style: "NOTIFICATION_BUTTON_STYLE_TYPE_DEFAULT";
	trackingParams: string;
	accessibility: A$Accessibility;
	tooltip: string;
	updateUnseenCountEndpoint: E$SignalServiceEndpoint;
	notificationCount: number;
	handlerDatas: ["NOTIFICATION_ACTION_UPDATE_UNSEEN_COUNT"];
};