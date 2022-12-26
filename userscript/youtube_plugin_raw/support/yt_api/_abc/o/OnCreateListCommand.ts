import {CommandMetadata} from "./CommandMetadata";
import {CreatePlaylistServiceEndpoint} from "./CreatePlaylistServiceEndpoint";
import {ClickTrackingParams} from "./ClickTrackingParams.js";

export interface OnCreateListCommand extends ClickTrackingParams {
	commandMetadata: CommandMetadata;
	createPlaylistServiceEndpoint: CreatePlaylistServiceEndpoint;
};
