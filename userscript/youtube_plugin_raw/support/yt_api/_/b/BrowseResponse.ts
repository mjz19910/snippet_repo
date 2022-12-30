import {BrowseEndpoint} from "./BrowseEndpoint.js";
import {BrowseResponseContent} from "./BrowseResponseContent";
import {GraftedVeItem} from "./GraftedVeItem";

export type BrowsePageResponse={
	page: "browse";
	endpoint: BrowseEndpoint;
	response: BrowseResponseContent;
	url: "/";
	expirationTime: number;
	graftedVes: GraftedVeItem[];
	previousCsn?: string;
};
