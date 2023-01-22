type D_GuideSubscriptionsSection=T_Items<G_GuideSubscriptionsSectionItem>&{
	sort: "CHANNEL_ACTIVITY";
	trackingParams: string;
	formattedTitle: R_SimpleText;
	handlerDatas: ["GUIDE_ACTION_ADD_TO_SUBSCRIPTIONS","GUIDE_ACTION_REMOVE_FROM_SUBSCRIPTIONS"];
};