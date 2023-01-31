
type D_ChannelId=`UC${string}`;
type D_SubscribeButton_Base={
	type: "FREE";
	channelId: D_ChannelId;
};
type D_SubscribeButton_Alts={
	buttonText: G_Text;
	subscribed: false;
	enabled: true;
	showPreferences: false;
	subscribedButtonText: G_Text;
	unsubscribedButtonText: G_Text;
	trackingParams: string;
	unsubscribeButtonText: G_Text;
	subscribeAccessibility: D_Accessibility;
	unsubscribeAccessibility: D_Accessibility;
	notificationPreferenceButton?: R_SubscriptionNotificationToggleButton;
	targetId: "watch-subscribe";
	subscribedEntityKey: string;
	onSubscribeEndpoints: E_Subscribe[];
	onUnsubscribeEndpoints: T_SE_Signal<DE_Empty_WCM,{}>[];
}|{
	buttonText: G_Text;
	subscribed: boolean;
	enabled: true;
	showPreferences: false;
	subscribedButtonText: G_Text;
	unsubscribedButtonText: G_Text;
	trackingParams: string;
	unsubscribeButtonText: G_Text;
	serviceEndpoints: E_Subscribe[];
	subscribeAccessibility: D_Accessibility;
	unsubscribeAccessibility: D_Accessibility;
}|{
	buttonText: G_Text;
	subscribed: true;
	enabled: true;
	showPreferences: false;
	subscribedButtonText: G_Text;
	unsubscribedButtonText: G_Text;
	trackingParams: string;
	unsubscribeButtonText: G_Text;
	serviceEndpoints: E_Subscribe[];
	subscribeAccessibility: D_Accessibility;
	unsubscribeAccessibility: D_Accessibility;
};
type D_SubscribeButton=D_SubscribeButton_Base&D_SubscribeButton_Alts;