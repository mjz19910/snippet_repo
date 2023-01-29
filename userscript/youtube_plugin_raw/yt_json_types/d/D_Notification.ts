type D_Notification={
	thumbnail: R_Thumbnail;
	videoThumbnail: R_Thumbnail;
	shortMessage: D_Text;
	sentTimeText: D_Text;
	navigationEndpoint: E_Watch;
	read: boolean;
	recordClickEndpoint: E_RecordNotificationInteractions;
	contextualMenu: R_Menu;
	trackingParams: string;
	notificationId: `${number}`;
};