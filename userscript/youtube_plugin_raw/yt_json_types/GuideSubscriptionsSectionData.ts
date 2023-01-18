type GuideSubscriptionsSectionData={
	sort: "CHANNEL_ACTIVITY";
	items: GuideSubscriptionsSectionItem[];
	trackingParams: string;
	formattedTitle: SimpleText;
	handlerDatas: ["GUIDE_ACTION_ADD_TO_SUBSCRIPTIONS","GUIDE_ACTION_REMOVE_FROM_SUBSCRIPTIONS"];
};
