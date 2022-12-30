import {CommandMetadata} from "../b/CommandMetadata.js";
import {PlaylistEditEndpoint} from "../p/PlaylistEditEndpoint.js";


export type ServiceEndpoint={
	clickTrackingParams: string;
	commandMetadata: CommandMetadata;
	playlistEditEndpoint: PlaylistEditEndpoint;
}|{
	clickTrackingParams: string;
	commandMetadata: CommandMetadata;
};
