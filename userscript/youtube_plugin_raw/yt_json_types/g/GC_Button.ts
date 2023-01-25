type GM_SignalService_SendPost={
	sendPost: true;
};

type M_SignalService_SendPost={webCommandMetadata: GM_SignalService_SendPost;};

type GC_Button=
	|EA_ChangeEngagementPanelVisibility
	|C_Continuation
	|TA_OpenPopup<{}>
	|TE_SignalService<M_SignalService_SendPost,GS_Client>
	|E_CreateBackstagePost
	|E_Url
	|C_Executor
	|C_GetSurvey
	;
;