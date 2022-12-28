import {ENUM_ACTIONS} from "../e/ENUM_ACTIONS";

export type PlaylistEditEndpoint={
	playlistId: string;
	actions: ENUM_ACTIONS[];
};
