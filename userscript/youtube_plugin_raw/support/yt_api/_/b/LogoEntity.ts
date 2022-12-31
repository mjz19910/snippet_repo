import {Icon} from "../i/Icon.js";
import {YtTextType} from "../../yt/YtTextType.js";
import {BrowseEndpoint} from "./BrowseEndpoint.js";

export type LogoEntity={
	iconImage: Icon<"YOUTUBE_LOGO">;
	tooltipText: YtTextType;
	endpoint: BrowseEndpoint;
	trackingParams: string;
	overrideEntityKey: string;
};
