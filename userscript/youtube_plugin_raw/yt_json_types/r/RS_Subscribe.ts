type RS_Subscribe_ActionItem=A_AddToGuideSection|TA_OpenPopup<{}>|C_RunAttestation|A_UpdateSubscribeButton;

type RS_Subscribe={
	responseContext: RC_ResponseContext;
	actions: RS_Subscribe_ActionItem[];
	newNotificationButton: {};
	trackingParams: string;
	frameworkUpdates: A_FrameworkUpdates;
};