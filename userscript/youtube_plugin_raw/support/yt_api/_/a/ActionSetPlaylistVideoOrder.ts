import {YtEndpoint} from "../../yt/YtEndpoint.js";
import {Accessibility} from "./Accessibility.js";

export type ActionSetPlaylistVideoOrder<T extends 1|2|3|4|5>={
	title: T extends 1? "Date added (newest)":T extends 2? "Date added (oldest)":T extends 3? "Most popular":T extends 4? "Date published (newest)":T extends 5? "Date published (oldest)":never;
	selected: false;
	serviceEndpoint: YtEndpoint;
	accessibility: Accessibility;
	trackingParams: string;
};
