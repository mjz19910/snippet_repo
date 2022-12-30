import {CommandMetadata} from "../c/CommandMetadata";
import {PlaylistEditEndpoint} from "../p/PlaylistEditEndpoint";
import {SignalServiceEndpoint} from "../s/SignalServiceEndpoint";

export interface UntoggledServiceEndpoint {
	commandMetadata: CommandMetadata;
	playlistEditEndpoint?: PlaylistEditEndpoint;
	signalServiceEndpoint?: SignalServiceEndpoint;
	clickTrackingParams: string;
}
