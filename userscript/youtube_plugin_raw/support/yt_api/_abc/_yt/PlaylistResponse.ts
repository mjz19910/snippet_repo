import {PlaylistEndpoint} from "./PlaylistEndpoint";
import {TwoColumnBrowseResultsRenderer} from "./TwoColumnBrowseResultsRenderer";

export type PlaylistResponse<T extends string>={
	endpoint: PlaylistEndpoint<T>;
	page: "playlist";
	response: {
		contents: {
			twoColumnBrowseResultsRenderer: TwoColumnBrowseResultsRenderer;
		};
		trackingParams: string;
	};
	url: `/playlist?list=${T}`;
};
