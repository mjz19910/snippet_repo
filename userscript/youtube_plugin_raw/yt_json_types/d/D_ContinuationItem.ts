type D_ContinuationItem={
	trigger: "CONTINUATION_TRIGGER_ON_ITEM_SHOWN";
	continuationEndpoint: C_Continuation;
}|{
	trigger: "CONTINUATION_TRIGGER_ON_ITEM_SHOWN";
	continuationEndpoint: C_Continuation;
	button: R_Button;
}|{
	trigger: "CONTINUATION_TRIGGER_ON_ITEM_SHOWN";
	continuationEndpoint: C_Continuation;
	ghostCards: R_GhostGrid;
};