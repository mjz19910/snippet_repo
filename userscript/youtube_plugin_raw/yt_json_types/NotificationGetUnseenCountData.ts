type ActionType={
	clickTrackingParams: string;
	updateNotificationsUnseenCountAction: {};
};

type NotificationGetUnseenCountData={
	responseContext: ResponseContext;
	actions?: ActionType[];
}|{
	responseContext: ResponseContext;
	unseenCount: number;
};
