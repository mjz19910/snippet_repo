import {Accessibility} from "../a/Accessibility";
import {ClickTrackingParams} from "../c/ClickTrackingParams.js";
import {CommandMetadata} from "../c/CommandMetadata";
import {Icon} from "../i/Icon";
import {PlaylistEditEndpoint} from "../p/PlaylistEditEndpoint";
import {SignalServiceEndpoint} from "../s/SignalServiceEndpoint";
import {TrackingParamsDef} from "./TrackingParams.js";

interface UntoggledServiceEndpoint extends ClickTrackingParams {
	commandMetadata: CommandMetadata;
	playlistEditEndpoint?: PlaylistEditEndpoint;
	signalServiceEndpoint?: SignalServiceEndpoint;
};

interface ToggledServiceEndpoint extends ClickTrackingParams {
	commandMetadata: CommandMetadata;
	playlistEditEndpoint: PlaylistEditEndpoint;
};

export interface ThumbnailOverlayToggleButtonRenderer extends TrackingParamsDef {
	isToggled?: boolean;
	untoggledIcon: Icon;
	toggledIcon: Icon;
	untoggledTooltip: string;
	toggledTooltip: string;
	untoggledServiceEndpoint: UntoggledServiceEndpoint;
	toggledServiceEndpoint?: ToggledServiceEndpoint;
	untoggledAccessibility: Accessibility;
	toggledAccessibility: Accessibility;
};
