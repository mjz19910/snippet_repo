import {YtEndpoint} from "./YtEndpoint.js";

export type PageTypeList=[
	"watch",
	"browse",
	"channel",
	"playlist",
	"settings",
	"shorts",
];

export type YtPageState={
	pageType: PageTypeList[number];
	endpoint: YtEndpoint;
	response: YtPageResponseType;
	fromHistory: boolean;
	navigationDoneMs: number;
};

export type YtPageResponseType={
	page: "browse";
	endpoint: YtEndpoint;
	response: {};
	url: "/";
};

