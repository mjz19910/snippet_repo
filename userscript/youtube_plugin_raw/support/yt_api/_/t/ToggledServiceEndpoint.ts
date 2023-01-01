import {CommandMetadata} from "../../json/CommandMetadata";
import {PlaylistEditEndpoint} from "../p/PlaylistEditEndpoint";

export interface ToggledServiceEndpoint {
	commandMetadata: CommandMetadata;
	playlistEditEndpoint: PlaylistEditEndpoint;
	clickTrackingParams: string;
}
