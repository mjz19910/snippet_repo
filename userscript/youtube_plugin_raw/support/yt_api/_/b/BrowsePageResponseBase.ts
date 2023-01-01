import {YtEndpoint} from "../../yt/YtEndpoint.js";
import {BrowseResponseContent} from "./BrowseResponseContent";

export type BrowsePageResponseBase={
	page: "browse";
	endpoint: YtEndpoint;
	response: BrowseResponseContent;
	url: "/";
};
