type ContinuationItemData={
	trigger: "CONTINUATION_TRIGGER_ON_ITEM_SHOWN";
	continuationEndpoint: ContinuationEndpoint;
	button?: ButtonRenderer;
	ghostCards?: GhostGridRenderer;
};
