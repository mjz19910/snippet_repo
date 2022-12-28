import {FeedEntry} from "./FeedEntry.js";

type BrowseEndpointPages="subscriptions"|"what_to_watch"|"library"|"history";
type VideoList<T extends string>=`VL${T}`
export type BrowseEndpointData={
	//spell:disable-next-line
	browseId: FeedEntry<BrowseEndpointPages>|VideoList<string>;
};
