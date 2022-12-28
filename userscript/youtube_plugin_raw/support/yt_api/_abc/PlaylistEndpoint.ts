import {PlaylistCommandMetadata} from "./PlaylistCommandMetadata";

export type PlaylistEndpoint={
	browseEndpoint: {
		browseId: `VL${string}`;
	};
	clickTrackingParams: string;
	commandMetadata: PlaylistCommandMetadata;
};
