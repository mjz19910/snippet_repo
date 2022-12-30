import {BrowseEndpoint} from "../b/BrowseEndpoint.js";
import {PageResponseContent} from "./PageResponseContent";


export type PlaylistPageResponse={
	page: "playlist";
	endpoint: BrowseEndpoint;
	response: PageResponseContent;
	url: `/playlist?list=${string}`;
};
