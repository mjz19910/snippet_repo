export type SortFilterSubMenuRenderer={
	accessibility: {
		accessibilityData: {
			label: "Ordering";
		};
	};
	icon: {
		iconType: "SORT";
	};
	subMenuItems: [
		{
			"title": "Date added (newest)",
			"selected": false,
			"serviceEndpoint": {
				"clickTrackingParams": string;
				"commandMetadata": {
					"webCommandMetadata": {
						"sendPost": true,
						"apiUrl": "/youtubei/v1/browse/edit_playlist"
					}
				},
				"playlistEditEndpoint": {
					"playlistId": "WL",
					"actions": [
						{
							"action": "ACTION_SET_PLAYLIST_VIDEO_ORDER",
							"playlistVideoOrder": 1
						}
					],
					"params": string;
				}
			},
			"accessibility": {
				"accessibilityData": {
					"label": "Date added (newest)"
				}
			},
			"trackingParams": string;
		},
		{
			"title": "Date added (oldest)",
			"selected": false,
			"serviceEndpoint": {
				"clickTrackingParams": string;
				"commandMetadata": {
					"webCommandMetadata": {
						"sendPost": true,
						"apiUrl": "/youtubei/v1/browse/edit_playlist"
					}
				},
				"playlistEditEndpoint": {
					"playlistId": "WL",
					"actions": [
						{
							"action": "ACTION_SET_PLAYLIST_VIDEO_ORDER",
							"playlistVideoOrder": 2
						}
					],
					"params": string;
				}
			},
			"accessibility": {
				"accessibilityData": {
					"label": "Date added (oldest)"
				}
			},
			"trackingParams": string;
		},
		{
			"title": "Most popular",
			"selected": false,
			"serviceEndpoint": {
				"clickTrackingParams": string;
				"commandMetadata": {
					"webCommandMetadata": {
						"sendPost": true,
						"apiUrl": "/youtubei/v1/browse/edit_playlist"
					}
				},
				"playlistEditEndpoint": {
					"playlistId": "WL",
					"actions": [
						{
							"action": "ACTION_SET_PLAYLIST_VIDEO_ORDER",
							"playlistVideoOrder": 3
						}
					],
					"params": string;
				}
			},
			"accessibility": {
				"accessibilityData": {
					"label": "Most popular"
				}
			},
			"trackingParams": string;
		},
		{
			"title": "Date published (newest)",
			"selected": false,
			"serviceEndpoint": {
				"clickTrackingParams": string;
				"commandMetadata": {
					"webCommandMetadata": {
						"sendPost": true,
						"apiUrl": "/youtubei/v1/browse/edit_playlist"
					}
				},
				"playlistEditEndpoint": {
					"playlistId": "WL",
					"actions": [
						{
							"action": "ACTION_SET_PLAYLIST_VIDEO_ORDER",
							"playlistVideoOrder": 4
						}
					],
					"params": string;
				}
			},
			"accessibility": {
				"accessibilityData": {
					"label": "Date published (newest)"
				}
			},
			"trackingParams": string;
		},
		{
			"title": "Date published (oldest)",
			"selected": false,
			"serviceEndpoint": {
				"clickTrackingParams": string;
				"commandMetadata": {
					"webCommandMetadata": {
						"sendPost": true,
						"apiUrl": "/youtubei/v1/browse/edit_playlist"
					}
				},
				"playlistEditEndpoint": {
					"playlistId": "WL",
					"actions": [
						{
							"action": "ACTION_SET_PLAYLIST_VIDEO_ORDER",
							"playlistVideoOrder": 5
						}
					],
					"params": string;
				}
			},
			"accessibility": {
				"accessibilityData": {
					"label": "Date published (oldest)"
				}
			},
			"trackingParams": string;
		}
	];
	title: "Sort";
	trackingParams: string;
};
