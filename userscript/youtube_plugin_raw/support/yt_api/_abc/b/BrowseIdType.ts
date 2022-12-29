import {BrowseEndpointPages} from "./BrowseEndpointPages";
import {ChannelIdStr} from "./ChannelIdStr";
import {FeedEntry} from "./FeedEntry.js";
import {VideoListStr} from "./VideoListStr";


export type BrowseIdType=FeedEntry<BrowseEndpointPages>|VideoListStr<string>|ChannelIdStr<string>;
