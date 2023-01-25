type D_SubscribeButton={
	buttonText: R_TextRuns;
	subscribed: false;
	enabled: true;
	type: "FREE";
	channelId: `UC${string}`;
	showPreferences: false;
	subscribedButtonText: R_TextRuns;
	unsubscribedButtonText: R_TextRuns;
	trackingParams: string;
	unsubscribeButtonText: R_TextRuns;
	serviceEndpoints?: (E_Subscribe|SubscribeButtonData$SignalServiceEndpoint)[];
	subscribeAccessibility: D_Accessibility;
	unsubscribeAccessibility: D_Accessibility;
	notificationPreferenceButton?: R_SubscriptionNotificationToggleButton;
	targetId: "watch-subscribe";
	subscribedEntityKey: string;
	onSubscribeEndpoints: E_Subscribe[];
	onUnsubscribeEndpoints: TE_SignalService<{}>[];
}|{
	buttonText: R_TextRuns;
	subscribed: boolean;
	enabled: true;
	type: "FREE";
	channelId: `UC${string}`;
	showPreferences: false;
	subscribedButtonText: R_TextRuns;
	unsubscribedButtonText: R_TextRuns;
	trackingParams: string;
	unsubscribeButtonText: R_TextRuns;
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