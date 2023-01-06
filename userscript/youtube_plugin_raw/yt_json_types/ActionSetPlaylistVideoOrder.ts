import {Accessibility} from "./Accessibility.js";

export type ActionSetPlaylistVideoOrder={
	title: string;
	selected: false;
	serviceEndpoint: YtEndpoint;
	accessibility: Accessibility;
	trackingParams: string;
};
