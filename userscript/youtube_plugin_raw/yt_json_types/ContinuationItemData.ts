type ContinuationItemData={
	trigger: "CONTINUATION_TRIGGER_ON_ITEM_SHOWN";
	continuationEndpoint: C$Continuation;
	button?: R$ButtonRenderer;
	ghostCards?: GhostGridRenderer;
};
