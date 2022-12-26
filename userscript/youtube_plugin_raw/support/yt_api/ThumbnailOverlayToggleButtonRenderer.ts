import {Accessibility} from "./Accessibility";
import {CT} from "./ClickTrackingParams.js";
import {CommandMetadata} from "./CommandMetadata";
import {Icon} from "./Icon";
import {PlaylistEditEndpoint} from "./PlaylistEditEndpoint";
import {SignalServiceEndpoint} from "./SignalServiceEndpoint";

interface UntoggledServiceEndpoint extends CT {
	commandMetadata: CommandMetadata;
	playlistEditEndpoint?: PlaylistEditEndpoint;
	signalServiceEndpoint?: SignalServiceEndpoint;
};

interface ToggledServiceEndpoint extends CT {
	commandMetadata: CommandMetadata;
	playlistEditEndpoint: PlaylistEditEndpoint;
};

export type ThumbnailOverlayToggleButtonRenderer={
	isToggled?: boolean;
	untoggledIcon: Icon;
	toggledIcon: Icon;
	untoggledTooltip: string;
	toggledTooltip: string;
	untoggledServiceEndpoint: UntoggledServiceEndpoint;
	toggledServiceEndpoint?: ToggledServiceEndpoint;
	untoggledAccessibility: Accessibility;
	toggledAccessibility: Accessibility;
	trackingParams: string;
};
