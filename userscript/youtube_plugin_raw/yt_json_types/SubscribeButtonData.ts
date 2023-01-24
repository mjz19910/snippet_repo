type D_SubscribeButton={
	buttonText: R_TextWithRuns;
	subscribed: false;
	enabled: true;
	type: "FREE";
	channelId: `UC${string}`;
	showPreferences: false;
	subscribedButtonText: R_TextWithRuns;
	unsubscribedButtonText: R_TextWithRuns;
	trackingParams: string;
	unsubscribeButtonText: R_TextWithRuns;
	serviceEndpoints?: (E_Subscribe|SubscribeButtonData$SignalServiceEndpoint)[];
	subscribeAccessibility: D_Accessibility;
	unsubscribeAccessibility: D_Accessibility;
	notificationPreferenceButton?: R_SubscriptionNotificationToggleButton;
	targetId: "watch-subscribe";
	subscribedEntityKey: string;
	onSubscribeEndpoints: E_Subscribe[];
	onUnsubscribeEndpoints: TE_SignalService<{}>[];
}|{
	buttonText: R_TextWithRuns;
	subscribed: false;
	enabled: true;
	type: "FREE";
	channelId: `UC${string}`;
	showPreferences: false;
	subscribedButtonText: R_TextWithRuns;
	unsubscribedButtonText: R_TextWithRuns;
	trackingParams: string;
	unsubscribeButtonText: R_TextWithRuns;
	serviceEndpoints: E_Subscribe[];
	subscribeAccessibility: D_Accessibility;
	unsubscribeAccessibility: D_Accessibility;
};
type SubscribeButtonData$SignalServiceEndpoint={
	clickTrackingParams: string;
	commandMetadata: {
		webCommandMetadata: {
			sendPost: true;
		}
	};
	signalServiceEndpoint: GS_Client;
};