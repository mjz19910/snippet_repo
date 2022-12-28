import {PlaylistCommandMetadata} from "./PlaylistCommandMetadata";

export type PlaylistEndpoint<T extends string>={
	browseEndpoint: {
		browseId: "VLWL";
	};
	clickTrackingParams: string;
	commandMetadata: PlaylistCommandMetadata<T>;
};
