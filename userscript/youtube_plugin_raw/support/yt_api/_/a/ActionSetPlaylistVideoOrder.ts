import {PlaylistEditEndpoint} from "../p/PlaylistEditEndpoint.js";
import {Accessibility} from "./Accessibility.js";
import {apiUrl} from "./apiUrl";
import {sendPost} from "./sendPost";
type makeWebCommandMetadata<_1 extends typeof sendPost,_2 extends typeof apiUrl,T extends boolean,U extends string>={
	sendPost: T;
	apiUrl: U;
};

type ActionEditPlaylistCommandMetadata={
	webCommandMetadata: makeWebCommandMetadata<sendPost,apiUrl,true,"/youtubei/v1/browse/edit_playlist">;
};

type EditPlaylistServiceEndpoint={
	clickTrackingParams: string;
	commandMetadata: ActionEditPlaylistCommandMetadata;
	playlistEditEndpoint: PlaylistEditEndpoint;
};

export type ActionSetPlaylistVideoOrder<T extends 1|2|3|4|5>={
	title: T extends 1? "Date added (newest)":T extends 2? "Date added (oldest)":T extends 3? "Most popular":T extends 4? "Date published (newest)":T extends 5? "Date published (oldest)":never;
	selected: false;
	serviceEndpoint: EditPlaylistServiceEndpoint;
	accessibility: Accessibility<T extends 1? "Date added (newest)":T extends 2? "Date added (oldest)":T extends 3? "Most popular":T extends 4? "Date published (newest)":T extends 5? "Date published (oldest)":never>;
	trackingParams: string;
};
