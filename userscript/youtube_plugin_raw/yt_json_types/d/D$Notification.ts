type D__Notification={
	thumbnail: D__Thumbnail;
	videoThumbnail: D__Thumbnail;
	shortMessage: R_SimpleText;
	sentTimeText: R_SimpleText;
	navigationEndpoint: E$WatchEndpoint;
	read: boolean;
	recordClickEndpoint: E$RecordNotificationInteractions;
	contextualMenu: R_Menu;
	trackingParams: string;
	notificationId: `${number}`;
};