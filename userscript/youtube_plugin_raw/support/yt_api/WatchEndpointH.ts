import {CommandMetadata} from "./CommandMetadata.js";
import {WatchEndpoint} from "./WatchEndpoint";

export type WatchEndpointH={
	clickTrackingParams: string;
	commandMetadata: CommandMetadata;
	watchEndpoint: WatchEndpoint;
};



export interface PageTypeWatch {
	pageType: "watch";
	fromHistory: false;
	navigationDoneMs: number;
	endpoint: WatchEndpointH;
	response: {};
}
type PageResponseBrowse={}
export interface PageTypeBrowse {
	pageType: "browse";
	fromHistory: false;
	navigationDoneMs: number;
	endpoint: WatchEndpointH&{
		['clickTrackingParams']: string;
		["commandMetadata"]: {};
		["watchEndpoint"]: {};
	};
	response: PageResponseBrowse;
}