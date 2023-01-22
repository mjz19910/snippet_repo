type D__Notification={
	thumbnail: D__Thumbnail;
	videoThumbnail: D__Thumbnail;
	shortMessage: R_SimpleText;
	sentTimeText: R_SimpleText;
	navigationEndpoint: E_WatchEndpoint;
	read: boolean;
	recordClickEndpoint: E_RecordNotificationInteractions;
	contextualMenu: R_Menu;
	trackingParams: string;
	notificationId: `${number}`;
};