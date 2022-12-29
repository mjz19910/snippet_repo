import {ChannelBrowseEndpoint} from "./ChannelBrowseEndpoint";
import {ChannelCommandMetadata} from "./ChannelCommandMetadata";

export type ChannelEndpoint={
	clickTrackingParams: string;
	browseEndpoint: ChannelBrowseEndpoint;
	commandMetadata: ChannelCommandMetadata;
};
