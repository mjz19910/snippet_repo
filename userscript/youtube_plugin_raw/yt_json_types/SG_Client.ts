type SG_Client=T_Signal<"CLIENT_SIGNAL">&T_Actions<[
	E_ShowEngagementPanel,
	A_SendFeedback,
	A_Signal,
	TA_OpenPopup<{}>
][number]>;