type TD_ContinuationItem<T>={
	trigger: "CONTINUATION_TRIGGER_ON_ITEM_SHOWN";
	continuationEndpoint: T;
};