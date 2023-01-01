import {Icon} from "../../../../yt_json_types/Icon.js";
import {YtTextType} from "../../json/YtTextType.js";
import {YtEndpoint} from "../../../../yt_json_types/YtEndpoint.js";
import {ButtonRenderer} from "../../../../yt_json_types/ButtonRenderer.js";


export type FusionSearchboxRendererData={
	icon: Icon<"SEARCH">;
	placeholderText: YtTextType;
	config: {
		webSearchboxConfig: {
			requestLanguage: "en";
			requestDomain: "ca";
			hasOnscreenKeyboard: boolean;
			focusSearchbox: true;
		};
	};
	trackingParams: string;
	searchEndpoint: YtEndpoint;
	clearButton: ButtonRenderer;
};
