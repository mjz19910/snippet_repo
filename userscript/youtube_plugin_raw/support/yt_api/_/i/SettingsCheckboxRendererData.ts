import {YtEndpoint} from "../../yt/YtEndpoint.js";
import {YtTextType} from "../../yt/YtTextType.js";


export type SettingsCheckboxRendererData={
	title: YtTextType;
	helpText?: YtTextType;
	enabled: boolean;
	enableServiceEndpoint: YtEndpoint;
	disableServiceEndpoint: YtEndpoint;
	disabled: boolean;
};
