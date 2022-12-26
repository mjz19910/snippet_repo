import {CommandMetadata} from "./CommandMetadata";
import {CreatePlaylistServiceEndpoint} from "./CreatePlaylistServiceEndpoint";
import {CT} from "./ClickTrackingParams.js";

export interface OnCreateListCommand extends CT {
	commandMetadata: CommandMetadata;
	createPlaylistServiceEndpoint: CreatePlaylistServiceEndpoint;
};
