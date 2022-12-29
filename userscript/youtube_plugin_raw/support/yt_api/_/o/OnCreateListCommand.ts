import {CommandMetadata} from "../../_abc/c/CommandMetadata";
import {CreatePlaylistServiceEndpoint} from "../../_abc/c/CreatePlaylistServiceEndpoint";
import {ClickTrackingParams} from "../../_abc/c/ClickTrackingParams.js";

export interface OnCreateListCommand extends ClickTrackingParams {
	commandMetadata: CommandMetadata;
	createPlaylistServiceEndpoint: CreatePlaylistServiceEndpoint;
};
