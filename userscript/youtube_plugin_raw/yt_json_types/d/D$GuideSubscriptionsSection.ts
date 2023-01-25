type D_GuideSubscriptionsSection={
	sort: "CHANNEL_ACTIVITY";
	items: G_GuideSubscriptionsSectionItem[];
	trackingParams: string;
	formattedTitle: R_SimpleText;
	handlerDatas: ["GUIDE_ACTION_ADD_TO_SUBSCRIPTIONS","GUIDE_ACTION_REMOVE_FROM_SUBSCRIPTIONS"];
};