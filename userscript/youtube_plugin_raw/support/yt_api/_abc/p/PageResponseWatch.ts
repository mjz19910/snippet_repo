import {WatchEndpoint} from "../w/WatchEndpoint.js";

export type PageResponseWatch<T>={
	page: "watch";
	endpoint: WatchEndpoint<T>;
};
