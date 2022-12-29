import {ENUM_ACTIONS} from "../../_/e/ENUM_ACTIONS";

export type PlaylistEditEndpoint={
	playlistId: string;
	actions: ENUM_ACTIONS[];
};
