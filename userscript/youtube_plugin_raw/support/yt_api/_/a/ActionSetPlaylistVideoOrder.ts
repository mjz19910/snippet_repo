import {CommandMetadata} from "../b/CommandMetadata.js";
import {PlaylistEditEndpoint} from "../p/PlaylistEditEndpoint.js";
import {Accessibility} from "./Accessibility.js";

export type ServiceEndpoint={
	clickTrackingParams: string;
	commandMetadata: CommandMetadata;
	playlistEditEndpoint: PlaylistEditEndpoint;
}|{
	clickTrackingParams: string;
	commandMetadata: CommandMetadata;
};

export type ActionSetPlaylistVideoOrder<T extends 1|2|3|4|5>={
	title: T extends 1? "Date added (newest)":T extends 2? "Date added (oldest)":T extends 3? "Most popular":T extends 4? "Date published (newest)":T extends 5? "Date published (oldest)":never;
	selected: false;
	serviceEndpoint: ServiceEndpoint;
	accessibility: Accessibility;
	trackingParams: string;
};
