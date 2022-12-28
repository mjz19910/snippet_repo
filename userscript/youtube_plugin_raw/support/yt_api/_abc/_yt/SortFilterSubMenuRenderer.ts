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
				"clickTrackingParams": "CC4Q48AHGAAiEwjNgbrBjJv8AhXVEH0KHUFmBoE=",
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
					"params": "CAFAAQ%3D%3D"
				}
			},
			"accessibility": {
				"accessibilityData": {
					"label": "Date added (newest)"
				}
			},
			"trackingParams": "CC4Q48AHGAAiEwjNgbrBjJv8AhXVEH0KHUFmBoE="
		},
		{
			"title": "Date added (oldest)",
			"selected": false,
			"serviceEndpoint": {
				"clickTrackingParams": "CC0Q48AHGAEiEwjNgbrBjJv8AhXVEH0KHUFmBoE=",
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
					"params": "CAFAAQ%3D%3D"
				}
			},
			"accessibility": {
				"accessibilityData": {
					"label": "Date added (oldest)"
				}
			},
			"trackingParams": "CC0Q48AHGAEiEwjNgbrBjJv8AhXVEH0KHUFmBoE="
		},
		{
			"title": "Most popular",
			"selected": false,
			"serviceEndpoint": {
				"clickTrackingParams": "CCwQ48AHGAIiEwjNgbrBjJv8AhXVEH0KHUFmBoE=",
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
					"params": "CAFAAQ%3D%3D"
				}
			},
			"accessibility": {
				"accessibilityData": {
					"label": "Most popular"
				}
			},
			"trackingParams": "CCwQ48AHGAIiEwjNgbrBjJv8AhXVEH0KHUFmBoE="
		},
		{
			"title": "Date published (newest)",
			"selected": false,
			"serviceEndpoint": {
				"clickTrackingParams": "CCsQ48AHGAMiEwjNgbrBjJv8AhXVEH0KHUFmBoE=",
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
					"params": "CAFAAQ%3D%3D"
				}
			},
			"accessibility": {
				"accessibilityData": {
					"label": "Date published (newest)"
				}
			},
			"trackingParams": "CCsQ48AHGAMiEwjNgbrBjJv8AhXVEH0KHUFmBoE="
		},
		{
			"title": "Date published (oldest)",
			"selected": false,
			"serviceEndpoint": {
				"clickTrackingParams": "CCoQ48AHGAQiEwjNgbrBjJv8AhXVEH0KHUFmBoE=",
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
					"params": "CAFAAQ%3D%3D"
				}
			},
			"accessibility": {
				"accessibilityData": {
					"label": "Date published (oldest)"
				}
			},
			"trackingParams": "CCoQ48AHGAQiEwjNgbrBjJv8AhXVEH0KHUFmBoE="
		}
	];
	title: "Sort";
	trackingParams: string;
};
