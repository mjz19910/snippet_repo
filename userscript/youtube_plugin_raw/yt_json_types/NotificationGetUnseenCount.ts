type NotificationGetUnseenCountResponse={
	responseContext: RC$ResponseContext;
	actions?: [UpdateNotificationsUnseenCountAction];
	unseenCount?: number;
};