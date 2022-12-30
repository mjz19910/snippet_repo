import {BrowseCommandMetadata} from "../b/BrowseCommandMetadata.js";
import {ChannelCommandMetadata} from "../c/ChannelCommandMetadata.js";
import {ShortsCommandMetadata} from "../s/ShortsCommandMetadata.js";
import {WatchCommandMetadata} from "../w/WatchCommandMetadata.js";
import {PlaylistCommandMetadata} from "./PlaylistCommandMetadata";


export type JsonCommandMetadata=PlaylistCommandMetadata|WatchCommandMetadata|BrowseCommandMetadata|ShortsCommandMetadata|ChannelCommandMetadata;
