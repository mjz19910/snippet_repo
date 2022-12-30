import {CommandMetadata} from "../c/CommandMetadata";
import {CreatePlaylistServiceEndpoint} from "../c/CreatePlaylistServiceEndpoint";
import {ClickTrackingParams} from "../c/ClickTrackingParams.js";

export interface OnCreateListCommand {
	commandMetadata: CommandMetadata;
	createPlaylistServiceEndpoint: CreatePlaylistServiceEndpoint;
};
