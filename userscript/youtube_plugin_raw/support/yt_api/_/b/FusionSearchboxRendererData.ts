import {Icon} from "../i/Icon.js";
import {YtTextType} from "../s/YtTextType.js";
import {ButtonRenderer} from "./ButtonRenderer.js";
import {YtEndpoint} from "./YtEndpoint.js";


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
