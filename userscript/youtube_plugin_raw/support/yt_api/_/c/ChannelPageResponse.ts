import {YtEndpoint} from "../b/YtEndpoint.js";
import {ChannelId} from "./ChannelId";
import {ChannelResponse} from "./ChannelResponse";

export type ChannelPageResponse={
	page: "channel";
	endpoint: YtEndpoint;
	response: ChannelResponse;
	url: `/channel/${ChannelId}`;
};
