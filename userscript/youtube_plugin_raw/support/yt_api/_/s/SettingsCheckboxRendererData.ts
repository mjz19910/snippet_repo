import {YtEndpoint} from "../../../../yt_json_types/YtEndpoint.js";
import {YtTextType} from "../../json/YtTextType.js";


export type SettingsCheckboxRendererData={
	title: YtTextType;
	helpText?: YtTextType;
	enabled: boolean;
	enableServiceEndpoint: YtEndpoint;
	disableServiceEndpoint: YtEndpoint;
	disabled: boolean;
};
