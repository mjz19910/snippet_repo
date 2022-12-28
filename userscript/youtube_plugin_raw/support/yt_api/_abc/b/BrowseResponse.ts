import {BrowseEndpoint} from "./BrowseEndpoint.js";
import {BrowseResponseContent} from "./BrowseResponseContent";

export type BrowseResponse={
	page: "browse";
	endpoint: BrowseEndpoint;
	response: BrowseResponseContent;
	url: "/";
	expirationTime: number;
	graftedVes: {
		csn: string;
		veData: {
			trackingParams: string;
		};
	}[];
	previousCsn?: string;
};
