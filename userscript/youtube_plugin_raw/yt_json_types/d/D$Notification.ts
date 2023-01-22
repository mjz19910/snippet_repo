type D_Notification={
	thumbnail: D_Thumbnail;
	videoThumbnail: D_Thumbnail;
	shortMessage: R_SimpleText;
	sentTimeText: R_SimpleText;
	navigationEndpoint: E_WatchEndpoint;
	read: boolean;
	recordClickEndpoint: E_RecordNotificationInteractions;
	contextualMenu: R_Menu;
	trackingParams: string;
	notificationId: `${number}`;
};