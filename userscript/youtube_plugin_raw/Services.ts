import {
	CsiService,
	ECatcherService,
	FilterHandlers,
	GFeedbackService,
	GuidedHelpService,
	TrackingServices
} from "./youtube_plugin.user.js";

export type Services={
	csi_service: CsiService;
	e_catcher_service: ECatcherService;
	g_feedback_service: GFeedbackService;
	guided_help_service: GuidedHelpService;
	service_tracking: TrackingServices;
	yt_handlers: FilterHandlers;
};
