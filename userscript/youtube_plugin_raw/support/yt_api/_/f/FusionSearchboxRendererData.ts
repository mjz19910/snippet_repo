import {Icon} from "../i/Icon.js";
import {YtTextType} from "../../yt/YtTextType.js";
import {YtEndpoint} from "../../yt/YtEndpoint.js";
import {ButtonRenderer} from "../b/ButtonRenderer.js";


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
