import {YtEndpoint} from "../../json/YtEndpoint.js";
import {YtTextType} from "../../json/YtTextType.js";

export type LinkRenderer={
	title: YtTextType;
	navigationEndpoint: YtEndpoint;
	trackingParams: string;
	style: "COMPACT_LINK_STYLE_TYPE_SETTINGS_SIDEBAR";
};
