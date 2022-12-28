
export type PlaylistEditEndpoint<T extends 1|2|3|4|5>={
	"playlistId": "WL";
	"actions": [
		{
			"action": "ACTION_SET_PLAYLIST_VIDEO_ORDER";
			"playlistVideoOrder": T;
		}
	];
	"params": string;
};
