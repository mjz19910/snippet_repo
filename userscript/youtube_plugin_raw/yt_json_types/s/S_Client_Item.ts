type S_Client_Item=[
	E_ShowEngagementPanel,
	A_SendFeedback,
	A_Signal,
	C_AddToPlaylist,
	TA_OpenPopup<TA_OpenPopup_Toast<R_NotificationAction>|TA_OpenPopup_TopAlignedDialog<R_VoiceSearchDialog>>,
][number];