type D_ContinuationItem={
	trigger: "CONTINUATION_TRIGGER_ON_ITEM_SHOWN";
	continuationEndpoint: C_Continuation;
}|{
	trigger: "CONTINUATION_TRIGGER_ON_ITEM_SHOWN";
	continuationEndpoint: C_Continuation;
	button: R_Button;
};;
type DD$D_ContinuationItem={
	button?: R_Button;
	ghostCards?: R_GhostGrid;
}