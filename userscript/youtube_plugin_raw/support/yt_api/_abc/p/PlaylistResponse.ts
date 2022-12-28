import {PlaylistEndpoint} from "./PlaylistEndpoint";
import {PlaylistResponseContent} from "../PlaylistResponseContent";

export type PlaylistResponse={
	endpoint: PlaylistEndpoint;
	page: "playlist";
	response: PlaylistResponseContent;
	url: `/playlist?list=${string}`;
};
