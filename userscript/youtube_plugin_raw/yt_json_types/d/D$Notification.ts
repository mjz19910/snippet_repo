type D__Notification={
	thumbnail: D__Thumbnail;
	videoThumbnail: D__Thumbnail;
	shortMessage: R$SimpleText;
	sentTimeText: R$SimpleText;
	navigationEndpoint: E$WatchEndpoint;
	read: boolean;
	recordClickEndpoint: E$RecordNotificationInteractions;
	contextualMenu: R$Menu;
	trackingParams: string;
	notificationId: `${number}`;
};