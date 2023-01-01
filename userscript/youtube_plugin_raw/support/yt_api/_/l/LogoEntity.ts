import {Icon} from "../../../../yt_json_types/Icon.js";
import {YtTextType} from "../../json/YtTextType.js";
import {BrowseEndpoint} from "./BrowseEndpoint.js";

export type LogoEntity={
	iconImage: Icon<"YOUTUBE_LOGO">;
	tooltipText: YtTextType;
	endpoint: BrowseEndpoint;
	trackingParams: string;
	overrideEntityKey: string;
};
