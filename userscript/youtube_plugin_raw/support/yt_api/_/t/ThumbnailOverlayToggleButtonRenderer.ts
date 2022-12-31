import {Accessibility} from "../../_/a/Accessibility";
import {Icon} from "../i/Icon.js";
import {ToggledServiceEndpoint} from "./ToggledServiceEndpoint";
import {UntoggledServiceEndpoint} from "../u/UntoggledServiceEndpoint";

export interface ThumbnailOverlayToggleButtonRenderer {
	isToggled?: boolean;
	untoggledIcon: Icon<never>;
	toggledIcon: Icon<never>;
	untoggledTooltip: string;
	toggledTooltip: string;
	untoggledServiceEndpoint: UntoggledServiceEndpoint;
	toggledServiceEndpoint?: ToggledServiceEndpoint;
	untoggledAccessibility: Accessibility;
	toggledAccessibility: Accessibility;
	trackingParams: string;
};
