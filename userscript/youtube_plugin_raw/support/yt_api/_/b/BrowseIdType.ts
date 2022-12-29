import {BrowseEndpointPages} from "./BrowseEndpointPages";
import {ChannelIdStr} from "../c/ChannelIdStr";
import {FeedEntry} from "../f/FeedEntry.js";
import {VideoListStr} from "../v/VideoListStr";


export type BrowseIdType=FeedEntry<BrowseEndpointPages>|VideoListStr<string>|ChannelIdStr<string>;
