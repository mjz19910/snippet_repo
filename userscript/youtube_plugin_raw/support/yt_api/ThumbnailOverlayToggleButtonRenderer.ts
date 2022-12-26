import {Accessibility} from "./Accessibility";
import {CT} from "./ClickTrackingParams.js";
import {CommandMetadata} from "./CommandMetadata";
import {Icon} from "./Icon";
import {PlaylistEditEndpoint} from "./PlaylistEditEndpoint";
import {SignalServiceEndpoint} from "./SignalServiceEndpoint";
import {TrackingParams} from "./TrackingParams.js";

interface UntoggledServiceEndpoint extends CT {
	commandMetadata: CommandMetadata;
	playlistEditEndpoint?: PlaylistEditEndpoint;
	signalServiceEndpoint?: SignalServiceEndpoint;
};

interface ToggledServiceEndpoint extends CT {
	commandMetadata: CommandMetadata;
	playlistEditEndpoint: PlaylistEditEndpoint;
};

export interface ThumbnailOverlayToggleButtonRenderer extends TrackingParams {
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
