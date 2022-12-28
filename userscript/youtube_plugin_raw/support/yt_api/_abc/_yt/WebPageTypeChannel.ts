import {ChannelEndpoint} from "./ChannelEndpoint";
import {ChannelResponse} from "./ChannelResponse";

export type WebPageTypeChannel={
	pageType: "channel";
	endpoint: ChannelEndpoint;
	response: ChannelResponse;
	fromHistory: boolean;
	navigationDoneMs: number;
};
