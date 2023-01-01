import {SettingsEndpointPages} from "../../../yt_json_types/SettingsEndpointPages.js";
import {YtEndpoint} from "../json/YtEndpoint.js";

export type PageTypeList=[
	"watch",
	"browse",
	"channel",
	"playlist",
	"settings",
	"shorts",
];
export type ResponsePageUrlList=[
	`/${SettingsEndpointPages}`,
]
export type YtPageState={
	pageType: "browse";
	endpoint: YtEndpoint;
	response: YtPageResponseType;
	fromHistory: boolean;
	navigationDoneMs: number;
};

export type YtPageResponseType={
	page: "browse";
	endpoint: YtEndpoint;
	response: {};
	url: string;
};

