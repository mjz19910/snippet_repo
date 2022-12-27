import {BrowseEndpoint} from "../b/BrowseEndpoint.js";

type BrowseResponse={
	contents: {};
	header: {};
	onResponseReceivedActions: {}[];
	responseContext: {};
	topbar: {};
	trackingParams: string;
};

export type PageResponseBrowse={
	page: "browse";
	endpoint: BrowseEndpoint;
	response: BrowseResponse;
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
