import {CommandMetadata} from "../c/CommandMetadata";
import {PlaylistEditEndpoint} from "../p/PlaylistEditEndpoint";

export interface ToggledServiceEndpoint {
	commandMetadata: CommandMetadata;
	playlistEditEndpoint: PlaylistEditEndpoint;
	clickTrackingParams: string;
}
