import {ServiceResolver} from "./youtube_plugin.user.js";
import {Services} from "./Services";

export type ResolverT=ServiceResolver<Services,{log_tracking_params: boolean; log_click_tracking_params: boolean;}>;
