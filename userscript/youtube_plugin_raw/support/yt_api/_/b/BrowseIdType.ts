import {BrowseEndpointPages} from "./BrowseEndpointPages";
import {ChannelIdStr} from "../../_abc/c/ChannelIdStr";
import {FeedEntry} from "../../_abc/f/FeedEntry.js";
import {VideoListStr} from "../../_abc/v/VideoListStr";


export type BrowseIdType=FeedEntry<BrowseEndpointPages>|VideoListStr<string>|ChannelIdStr<string>;
