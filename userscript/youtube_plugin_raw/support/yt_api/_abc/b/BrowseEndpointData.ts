import {BrowseEndpointPages} from "./BrowseEndpointPages";
import {FeedEntry} from "./FeedEntry.js";

type VideoList<T extends string>=`VL${T}`
export type BrowseEndpointData={
	//spell:disable-next-line
	browseId: FeedEntry<BrowseEndpointPages>|VideoList<string>;
};
