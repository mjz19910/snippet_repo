import {CommandMetadata} from "../../json/CommandMetadata";
import {PlaylistEditEndpoint} from "../p/PlaylistEditEndpoint";
import {SignalServiceEndpointData} from "../s/SignalServiceEndpoint";

export interface UntoggledServiceEndpoint {
	commandMetadata: CommandMetadata;
	playlistEditEndpoint?: PlaylistEditEndpoint;
	signalServiceEndpoint?: SignalServiceEndpointData;
	clickTrackingParams: string;
}
