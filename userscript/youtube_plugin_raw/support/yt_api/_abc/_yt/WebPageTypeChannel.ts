import {ChannelEndpoint} from "./ChannelEndpoint";
import {ChannelResponse} from "./ChannelResponse";

export type WebPageTypeChannel={
	pageType: "channel";
	endpoint: ChannelEndpoint;
	fromHistory: boolean;
	response: ChannelResponse;
	navigationDoneMs: number;
};
