type NotificationGetUnseenCountResponse={
	responseContext: ResponseContext;
	actions?: [UpdateNotificationsUnseenCountAction];
	unseenCount?: number;
};