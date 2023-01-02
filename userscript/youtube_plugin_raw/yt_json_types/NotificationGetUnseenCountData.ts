type UpdateNotificationsUnseenCount={
	handlerData: "NOTIFICATION_ACTION_UPDATE_UNSEEN_COUNT";
	unseenCount: number;
	timeoutMs: number;
};
type ActionType={
	clickTrackingParams: string;
	updateNotificationsUnseenCountAction: UpdateNotificationsUnseenCount;
};

type NotificationGetUnseenCountData={
	responseContext: ResponseContext;
	actions?: ActionType[];
}|{
	responseContext: ResponseContext;
	unseenCount: number;
};
