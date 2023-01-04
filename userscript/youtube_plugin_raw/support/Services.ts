type Services={
	csi_service: import("../youtube_plugin.user.js").CsiService;
	e_catcher_service: import("../youtube_plugin.user.js").ECatcherService;
	g_feedback_service: import("../youtube_plugin.user.js").GFeedbackService;
	guided_help_service: import("../youtube_plugin.user.js").GuidedHelpService;
	service_tracking: import("../youtube_plugin.user.js").TrackingServices;
	yt_handlers: import("../youtube_plugin.user.js").HiddenData<import("../youtube_plugin.user.js").FilterHandlers>;
};
