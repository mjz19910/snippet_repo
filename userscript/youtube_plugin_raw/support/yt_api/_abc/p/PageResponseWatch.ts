import {WatchEndpoint} from "../w/WatchEndpoint.js";
import {WatchContentResponse} from "./WatchContentResponse";
import {WatchPlayerResponse} from "./WatchPlayerResponse";

export type PageResponseWatch={
	page: "watch";
	endpoint: WatchEndpoint;
	response: WatchContentResponse;
	playerResponse: WatchPlayerResponse;
	url: string;
};
