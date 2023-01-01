import {UrlTypes} from "../_/u/UrlTypes.js";
import {YtJsonRequest} from "./YtJsonRequest";

export type YtJsonUnsupportedRequest={
	type: Exclude<UrlTypes,YtJsonRequest["type"]>;
	data: {};
	request: string|URL|Request;
	parsed_url: URL;
};
