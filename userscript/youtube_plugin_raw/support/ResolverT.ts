import {ServiceResolver} from "../youtube_plugin.user.js";
import {Services} from "./Services";

export type ResolverT={
	value: ServiceResolver<Services,{
		log_tracking_params: boolean;
		log_click_tracking_params: boolean;
		noisy_logging: boolean;
	}>|null;
};