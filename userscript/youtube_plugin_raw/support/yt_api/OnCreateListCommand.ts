import {CommandMetadata} from "./CommandMetadata";
import {CreatePlaylistServiceEndpoint} from "./CreatePlaylistServiceEndpoint";

export type OnCreateListCommand={
	clickTrackingParams: string;
	commandMetadata: CommandMetadata;
	createPlaylistServiceEndpoint: CreatePlaylistServiceEndpoint;
};
