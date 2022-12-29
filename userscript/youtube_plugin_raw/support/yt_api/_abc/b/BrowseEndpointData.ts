import {BrowseEndpointPages} from "./BrowseEndpointPages";
import {FeedEntry} from "./FeedEntry.js";

type VideoList<T extends string>=`VL${T}`;
type ChannelId<T extends string>=`UC${T}`;

export type BrowseIdType=FeedEntry<BrowseEndpointPages>|VideoList<string>|ChannelId<string>;
export type BrowseEndpointData={
	//spell:disable-next-line
	browseId: BrowseIdType;
};
