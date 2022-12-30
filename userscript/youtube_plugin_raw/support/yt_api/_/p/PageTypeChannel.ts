import {ChannelPageResponse} from "../c/ChannelPageResponse";

export type PageTypeChannel={
	pageType: "channel";
	endpoint: {};
	response: ChannelPageResponse;
	fromHistory: boolean;
	navigationDoneMs: number;
};
