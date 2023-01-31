type RS_Subscribe_ActionItem=A_AddToGuideSection|TA_OpenPopup_Empty|C_RunAttestation|AU_SubscribeButton;

type RS_Subscribe={
	responseContext: RC_ResponseContext;
	actions: RS_Subscribe_ActionItem[];
	newNotificationButton: {};
	trackingParams: string;
	frameworkUpdates: A_FrameworkUpdates;
};