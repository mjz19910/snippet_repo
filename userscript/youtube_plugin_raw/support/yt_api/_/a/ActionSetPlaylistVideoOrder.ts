import {PlaylistEditEndpoint} from "../PlaylistEditEndpoint";

export type ActionSetPlaylistVideoOrder<T extends 1|2|3|4|5>={
	"title": T extends 1? "Date added (newest)":T extends 2? "Date added (oldest)":T extends 3? "Most popular":T extends 4? "Date published (newest)":T extends 5? "Date published (oldest)":never;
	"selected": false;
	"serviceEndpoint": {
		"clickTrackingParams": string;
		"commandMetadata": {
			"webCommandMetadata": {
				"sendPost": true;
				"apiUrl": "/youtubei/v1/browse/edit_playlist";
			};
		};
		"playlistEditEndpoint": {
			"playlistId": "WL";
			"actions": [
				{
					"action": "ACTION_SET_PLAYLIST_VIDEO_ORDER";
					"playlistVideoOrder": PlaylistEditEndpoint<T>;
				}
			];
			"params": string;
		};
	};
	"accessibility": {
		"accessibilityData": {
			"label": T extends 1? "Date added (newest)":T extends 2? "Date added (oldest)":T extends 3? "Most popular":T extends 4? "Date published (newest)":T extends 5? "Date published (oldest)":never;
		};
	};
	"trackingParams": string;
};
