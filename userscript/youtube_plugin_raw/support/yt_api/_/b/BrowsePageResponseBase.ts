import {BrowseEndpoint} from "./BrowseEndpoint.js";
import {BrowseResponseContent} from "./BrowseResponseContent";

export type BrowsePageResponseBase={
	page: "browse";
	endpoint: BrowseEndpoint;
	response: BrowseResponseContent;
	url: "/";
};
