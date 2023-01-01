import {Accessibility} from "./Accessibility.js";
import {YtEndpoint} from "./YtEndpoint.js";

export type ActionSetPlaylistVideoOrder={
	title: string;
	selected: false;
	serviceEndpoint: YtEndpoint;
	accessibility: Accessibility;
	trackingParams: string;
};
