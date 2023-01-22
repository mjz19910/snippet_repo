type R$ContinuationItemRenderer={
	continuationItemRenderer: ContinuationItemData;
};
type T$ContinuationItemRenderer<T>={
	continuationItemRenderer: T$ContinuationItemData<T>;
};
type T$ContinuationItemData<T>={
	trigger: "CONTINUATION_TRIGGER_ON_ITEM_SHOWN";
	continuationEndpoint: T;
};
type getNotificationMenuEndpoint={
	clickTrackingParams: string;
	commandMetadata: {
		webCommandMetadata: {
			sendPost: true;
			apiUrl: "/youtubei/v1/notification/get_notification_menu";
		};
	};
	getNotificationMenuEndpoint: {
		ctoken: "CJaf6PnE0fwC";
	};
}