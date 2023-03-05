type D_SubscribeButton_UnsubscribedPrefix={
	buttonText: G_Text;
};
type D_SubscribeButton_SubscribedPrefix={
	buttonText?: G_Text;
	entityKey?: string;
};
type D_SubscribeButton_SubscribePrefix={
	accessibility?: D_Accessibility;
};
type D_SubscribeButton_UnsubscribePrefix={
	buttonText?: G_Text;
	accessibility?: D_Accessibility;
};
type D_SubscribeButton=
	&T_AddPrefix<D_SubscribeButton_SubscribedPrefix,"subscribed">
	&T_AddPrefix<D_SubscribeButton_UnsubscribedPrefix,"unsubscribed">
	&T_AddPrefix<D_SubscribeButton_SubscribePrefix,"subscribe">
	&T_AddPrefix<D_SubscribeButton_UnsubscribePrefix,"unsubscribe">
	&{
		buttonText?: G_Text;
		subscribed?: boolean;
		enabled: true;
		type?: "FREE";
		channelId?: T_IdTemplate<"UC",D_UserIdStr>;
		showPreferences?: boolean;
		trackingParams?: string;
		serviceEndpoints?: (E_Subscribe|E_SignalService_SendPost)[];
		notificationPreferenceButton?: R_SubscriptionNotificationToggleButton;
		targetId?: "watch-subscribe";
		onSubscribeEndpoints?: E_Subscribe[];
		onUnsubscribeEndpoints?: E_SignalService_SendPost[];
	}
	;
;