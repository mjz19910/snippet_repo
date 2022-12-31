import {UrlTypes} from "../_/u/UrlTypes.js";
import {YtJsonRequest} from "./YtJsonRequest";

export type YtJsonUnsupportedRequest={
	url_type: Exclude<UrlTypes,YtJsonRequest["url_type"]>;
	json: {};
	request: string|URL|Request;
	parsed_url: URL;
};
