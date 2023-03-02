type D_Button_SE=
	|C_GetPdgBuyFlow
	|E_CreateComment
	|E_CreateCommentReply
	|E_ShareEntityService
	|E_SignalService_SendPost
	|E_Unsubscribe
	|E_YpcGetOffers
	;
;
type E_CreateCommentReply={
	clickTrackingParams: string;
	commandMetadata: {};
	createCommentReplyEndpoint: {};
};