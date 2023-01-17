type ContinuationItemData={
	trigger: "CONTINUATION_TRIGGER_ON_ITEM_SHOWN";
	continuationEndpoint: ContinuationCommand;
	button?: ButtonRenderer;
	ghostCards?: GhostGridRenderer;
};
