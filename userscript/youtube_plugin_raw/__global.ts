import {SavedData} from "./youtube_plugin.user";

// YtdPageManagerElement
declare global {
	interface YtdPageManagerElementInterface extends HTMLElement {
		getCurrentPage(): YtCurrentPage;
	}
	interface YTDPlayerElement extends HTMLElement {
		active_nav: boolean;
		player_: {getVideoData(): {video_id: string; eventId: undefined; title: any; author: any;}; getPlayerState(): {};}|null;
		playerResolver_: {
			promise: Promise<void>;
		};
		init_nav: boolean;
		is_watch_page_active: boolean;
		pause(): void;
		play(): void;
	}
	interface YtCurrentPage extends HTMLElement {
		getPlayer(): YTDPlayerElement;
		__has_theater_handler_plugin: boolean|undefined;
	}
}

// ReloadContinuationItemsCommand
declare global {
	type SectionItem=RichItemRendererItem|RichSectionRendererItem;
	type ReloadContinuationItemsCommand={
		slot: "RELOAD_CONTINUATION_SLOT_BODY";
		targetId: "browse-feedFEwhat_to_watch";
		continuationItems: SectionItem[];
	};
}

declare global {
	type BrowseFeedItem={};
	type BrowseFeedAction={
		targetId: "browse-feedFEwhat_to_watch";
		continuationItems: BrowseFeedItem[];
	};
}

// CommentsSectionContinuationAction
declare global {
	type CommentsSectionItem={};
	type CommentsSectionContinuationAction={
		targetId: "comments-section";
		continuationItems: CommentsSectionItem[];
	};
}
// WatchNextContinuationAction
declare global {
	type WatchNextItem={
		compactVideoRenderer: CompactVideoRenderer;
	}|{
		continuationItemRenderer: ContinuationItemRenderer;
	};
	interface WatchNextContinuationAction {
		targetId: "watch-next-feed";
		continuationItems: WatchNextItem[];
	}
}

// saved_maps
declare global {
	interface InjectApi {
		saved_maps?: Map<string,Map<string,{}>>;
	}
}

// saved_objects
declare global {
	interface InjectApi {
		saved_data?: SavedData;
	}
}

// ContinuationItem
declare global {
	type ContinuationItem=RendererContentItem;
}

type AdSlotRenderer={};

// RichItemRenderer
declare global {
	type AdSlotRenderers={
		adSlotRenderer: AdSlotRenderer;
	};
	type RichItemRendererContent=AdSlotRenderers;
	interface RichItemRenderer {
		content: AdSlotRenderers;
	}
	type RichItemRendererItem={
		richItemRenderer: RichItemRenderer;
	};
}

// RichSectionRendererItem
declare global {
	type RichSectionRendererItem={
		richSectionRenderer: RichSectionRenderer;
	};
}


interface RichShelfRenderer {
	icon: {
		iconType: string;
	}|null;
	title: {
		runs?: {
			text: string;
		}[];
	};
}
interface RichSectionRenderer {
	content: {
		richShelfRenderer: RichShelfRenderer;
	};
}

type CommentsHeaderRenderer={};
type CommentThreadRenderer={};
type ContentItemCommentsHeaderRenderer={
	commentsHeaderRenderer: CommentsHeaderRenderer;
};
type ContentItemCommentThreadRenderer={
	commentThreadRenderer: CommentThreadRenderer;
};
type CommandToken={
	token: string;
};
type ContinuationCommand=CommandToken&{
	request: string;
};
type WebCommandMetadata={
	sendPost?: boolean;
	apiUrl?: string;
	rootVe?: number;
	url?: string;
	webPageType?: string;
};
type CommandMetadata={
	webCommandMetadata: WebCommandMetadata;
};
type ContinuationEndpoint={
	clickTrackingParams: string;
	commandMetadata: CommandMetadata;
	continuationCommand: ContinuationCommand;
};
type GhostGridRenderer={
	rows: number;
};
type GhostCards={
	ghostGridRenderer: GhostGridRenderer;
};
type ContinuationItemRenderer={
	trigger: string;
	continuationEndpoint: ContinuationEndpoint;
	ghostCards: GhostCards;
};
type ContinuationItemRenderers={
	continuationItemRenderer: ContinuationItemRenderer;
};
type MenuRenderer={
	accessibility: Accessibility;
	items: MenuServiceItem[];
	targetId: string;
	trackingParams: string;
};
type Icon={
	iconType: string;
};
type CreatePlaylistServiceEndpoint={
	params: string;
	videoIds: string[];
};
type OnCreateListCommand={
	clickTrackingParams: string;
	commandMetadata: CommandMetadata;
	createPlaylistServiceEndpoint: CreatePlaylistServiceEndpoint;
};
type AddToPlaylistCommand={
	listType: string;
	onCreateListCommand: OnCreateListCommand;
	openListPanel: boolean;
	openMiniplayer: boolean;
	videoId: string;
	videoIds: string[];
};
type NotificationActionRenderer={
	responseText: SimpleText;
	trackingParams: string;
};
type ToastPopup={
	notificationActionRenderer: NotificationActionRenderer;
};
type ToastPopupTag={
	popup: ToastPopup;
	popupType: "TOAST";
};
type OpenPopupAction=ToastPopupTag;
type ServiceEndpointAction={
	clickTrackingParams: string;
}&({
	addToPlaylistCommand: AddToPlaylistCommand;
}|{
	openPopupAction: OpenPopupAction;
});
type SignalServiceEndpoint={
	signal: "CLIENT_SIGNAL";
	actions: ServiceEndpointAction[];
};
type ServiceEndpointBase<T>={
	clickTrackingParams: string;
	commandMetadata: CommandMetadata;
	trackingParams?: string;
}&T;
type SignalServiceEndpoints={
	signalServiceEndpoint: SignalServiceEndpoint;
};
type ServiceEndpoint=
	ServiceEndpointBase<SignalServiceEndpoints>|
	ServiceEndpointBase<{playlistEditEndpoint: {};}>;
type MenuServiceItemRenderer={
	icon: Icon;
	serviceEndpoint: ServiceEndpoint;
	text: TextRuns;
	trackingParams?: string;
};
type MenuServiceItem={
	menuServiceItemRenderer: MenuServiceItemRenderer;
};
type MenuRenderers={
	menuRenderer: MenuRenderer;
};
type CommonConfig={
	url: string;
};
type PlaybackOnesieConfig={
	commonConfig: CommonConfig;
};
type WatchEndpointConfig={
	html5PlaybackOnesieConfig: PlaybackOnesieConfig;
};
type WatchEndpoint={
	nofollow: boolean;
	videoId: string;
	watchEndpointSupportedOnesieConfig: WatchEndpointConfig;
};
type NavigationEndpoint={
	clickTrackingParams: string;
	commandMetadata: CommandMetadata;
	watchEndpoint?: WatchEndpoint;
	browseEndpoint?: BrowseEndpoint;
};
type TODO={};
type BrowseEndpoint={
	browseId: string;
	canonicalBaseUrl: string;
};

type TextRun={
	text: string;
	navigationEndpoint?: NavigationEndpoint;
};
type TextRuns={
	runs: TextRun[];
};
type AccessibilityData={
	label: string;
};
type Accessibility={
	accessibilityData: AccessibilityData;
};
type MetadataBadgeRenderer={
	label: string;
	style: string;
	trackingParams: string;
};
type MetadataBadgeRenderers={
	metadataBadgeRenderer: MetadataBadgeRenderer;
};
type ThumbnailsHolder={};
type SimpleText={
	accessibility?: Accessibility;
	simpleText: string;
};

type CompactVideoRenderer={
	accessibility: Accessibility;
	badges: MetadataBadgeRenderers[];
	channelThumbnail: ThumbnailsHolder;
	lengthText: SimpleText;
	longBylineText: TextRuns;
	menu: MenuRenderers;
	navigationEndpoint: NavigationEndpoint;
	publishedTimeText: SimpleText;
	richThumbnail: TODO;
	shortBylineText: TextRuns;
	shortViewCountText: SimpleText;
	thumbnail: {thumbnails: TODO[];};
	thumbnailOverlays: TODO[];
	title: SimpleText;
	videoId: string;
	viewCountText: SimpleText;
};
type CompactVideoRenderers={
	compactVideoRenderer: CompactVideoRenderer;
};

const TCvr: CompactVideoRenderers={
	"compactVideoRenderer": {
		"videoId": "OAIqCpqszVw",
		"thumbnail": {
			"thumbnails": [
				{
					"url": "https://i.ytimg.com/vi/OAIqCpqszVw/hqdefault.jpg?sqp=-oaymwE1CKgBEF5IVfKriqkDKAgBFQAAiEIYAXABwAEG8AEB-AH-CYAC0AWKAgwIABABGB8gZShWMA8=&rs=AOn4CLCpqrflce1_k2te4K_5kNbCpjCm6Q",
					"width": 168,
					"height": 94
				},
				{
					"url": "https://i.ytimg.com/vi/OAIqCpqszVw/hqdefault.jpg?sqp=-oaymwE2CNACELwBSFXyq4qpAygIARUAAIhCGAFwAcABBvABAfgB_gmAAtAFigIMCAAQARgfIGUoVjAP&rs=AOn4CLCtCzjj88a4Zs9RCIVwZL-iZyOwtQ",
					"width": 336,
					"height": 188
				}
			]
		},
		"title": {
			"accessibility": {
				"accessibilityData": {
					"label": "Programming Language Q&A, December 2022 by Jonathan Blow 2 days ago 2 hours, 49 minutes 15,435 views"
				}
			},
			"simpleText": "Programming Language Q&A, December 2022"
		},
		"longBylineText": {
			"runs": [
				{
					"text": "Jonathan Blow",
					"navigationEndpoint": {
						"clickTrackingParams": "CPoBEKQwGAIiEwjL2vv9tY_8AhX0TUwIHeCADF4yB3JlbGF0ZWQ=",
						"commandMetadata": {
							"webCommandMetadata": {
								"url": "/@jblow888",
								"webPageType": "WEB_PAGE_TYPE_CHANNEL",
								"rootVe": 3611,
								"apiUrl": "/youtubei/v1/browse"
							}
						},
						"browseEndpoint": {
							"browseId": "UCCuoqzrsHlwv1YyPKLuMDUQ",
							"canonicalBaseUrl": "/@jblow888"
						}
					}
				}
			]
		},
		"publishedTimeText": {
			"simpleText": "2 days ago"
		},
		"viewCountText": {
			"simpleText": "15,435 views"
		},
		"lengthText": {
			"accessibility": {
				"accessibilityData": {
					"label": "2 hours, 49 minutes, 27 seconds"
				}
			},
			"simpleText": "2:49:27"
		},
		"navigationEndpoint": {
			"clickTrackingParams": "CPoBEKQwGAIiEwjL2vv9tY_8AhX0TUwIHeCADF4yB3JlbGF0ZWRItvz4oKGp6cENmgEFCAEQ-B0=",
			"commandMetadata": {
				"webCommandMetadata": {
					"url": "/watch?v=OAIqCpqszVw",
					"webPageType": "WEB_PAGE_TYPE_WATCH",
					"rootVe": 3832
				}
			},
			"watchEndpoint": {
				"videoId": "OAIqCpqszVw",
				"nofollow": true,
				"watchEndpointSupportedOnesieConfig": {
					"html5PlaybackOnesieConfig": {
						"commonConfig": {
							"url": "https://rr2---sn-nx5s7nee.googlevideo.com/initplayback?source=youtube&oeis=1&c=WEB&oad=3200&ovd=3200&oaad=11000&oavd=11000&ocs=700&oewis=1&oputc=1&ofpcc=1&msp=1&odepv=1&id=38022a0a9aaccd5c&ip=104.243.223.8&initcwndbps=832500&mt=1671787055&oweuc="
						}
					}
				}
			}
		},
		"shortBylineText": {
			"runs": [
				{
					"text": "Jonathan Blow",
					"navigationEndpoint": {
						"clickTrackingParams": "CPoBEKQwGAIiEwjL2vv9tY_8AhX0TUwIHeCADF4yB3JlbGF0ZWQ=",
						"commandMetadata": {
							"webCommandMetadata": {
								"url": "/@jblow888",
								"webPageType": "WEB_PAGE_TYPE_CHANNEL",
								"rootVe": 3611,
								"apiUrl": "/youtubei/v1/browse"
							}
						},
						"browseEndpoint": {
							"browseId": "UCCuoqzrsHlwv1YyPKLuMDUQ",
							"canonicalBaseUrl": "/@jblow888"
						}
					}
				}
			]
		},
		"badges": [
			{
				"metadataBadgeRenderer": {
					"style": "BADGE_STYLE_TYPE_SIMPLE",
					"label": "New",
					"trackingParams": "CPoBEKQwGAIiEwjL2vv9tY_8AhX0TUwIHeCADF4="
				}
			}
		],
		"channelThumbnail": {
			"thumbnails": [
				{
					"url": "https://yt3.ggpht.com/ytc/AMLnZu_AXVHnfU2z_ztTzkNmDVLlxHvTDVYn5C6HpMtT_A=s68-c-k-c0x00ffffff-no-rj",
					"width": 68,
					"height": 68
				}
			]
		},
		"trackingParams": "CPoBEKQwGAIiEwjL2vv9tY_8AhX0TUwIHeCADF5A3Jqz1anBioE4",
		"shortViewCountText": {
			"accessibility": {
				"accessibilityData": {
					"label": "15K views"
				}
			},
			"simpleText": "15K views"
		},
		"menu": {
			"menuRenderer": {
				"items": [
					{
						"menuServiceItemRenderer": {
							"text": {
								"runs": [
									{
										"text": "Add to queue"
									}
								]
							},
							"icon": {
								"iconType": "ADD_TO_QUEUE_TAIL"
							},
							"serviceEndpoint": {
								"clickTrackingParams": "CIUCEP6YBBgIIhMIy9r7_bWP_AIV9E1MCB3ggAxe",
								"commandMetadata": {
									"webCommandMetadata": {
										"sendPost": true
									}
								},
								"signalServiceEndpoint": {
									"signal": "CLIENT_SIGNAL",
									"actions": [
										{
											"clickTrackingParams": "CIUCEP6YBBgIIhMIy9r7_bWP_AIV9E1MCB3ggAxe",
											"addToPlaylistCommand": {
												"openMiniplayer": false,
												"openListPanel": true,
												"videoId": "OAIqCpqszVw",
												"listType": "PLAYLIST_EDIT_LIST_TYPE_QUEUE",
												"onCreateListCommand": {
													"clickTrackingParams": "CIUCEP6YBBgIIhMIy9r7_bWP_AIV9E1MCB3ggAxe",
													"commandMetadata": {
														"webCommandMetadata": {
															"sendPost": true,
															"apiUrl": "/youtubei/v1/playlist/create"
														}
													},
													"createPlaylistServiceEndpoint": {
														"videoIds": [
															"OAIqCpqszVw"
														],
														"params": "CAQ%3D"
													}
												},
												"videoIds": [
													"OAIqCpqszVw"
												]
											}
										},
										{
											"clickTrackingParams": "CIUCEP6YBBgIIhMIy9r7_bWP_AIV9E1MCB3ggAxe",
											"openPopupAction": {
												"popup": {
													"notificationActionRenderer": {
														"responseText": {
															"simpleText": "Added to queue"
														},
														"trackingParams": "CIYCELlqIhMIy9r7_bWP_AIV9E1MCB3ggAxe"
													}
												},
												"popupType": "TOAST"
											}
										}
									]
								}
							},
							"trackingParams": "CIUCEP6YBBgIIhMIy9r7_bWP_AIV9E1MCB3ggAxe"
						}
					},
					{
						"menuServiceItemRenderer": {
							"text": {
								"runs": [
									{
										"text": "Save to Watch Later"
									}
								]
							},
							"icon": {
								"iconType": "WATCH_LATER"
							},
							"serviceEndpoint": {
								"clickTrackingParams": "CPoBEKQwGAIiEwjL2vv9tY_8AhX0TUwIHeCADF4=",
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
											"addedVideoId": "OAIqCpqszVw",
											"action": "ACTION_ADD_VIDEO"
										}
									]
								}
							},
							"trackingParams": "CPoBEKQwGAIiEwjL2vv9tY_8AhX0TUwIHeCADF4="
						}
					},
					{
						"menuServiceItemRenderer": {
							"text": {
								"runs": [
									{
										"text": "Save to playlist"
									}
								]
							},
							"icon": {
								"iconType": "PLAYLIST_ADD"
							},
							"serviceEndpoint": {
								"clickTrackingParams": "CIQCEJSsCRgKIhMIy9r7_bWP_AIV9E1MCB3ggAxe",
								"commandMetadata": {
									"webCommandMetadata": {
										"sendPost": true,
										"apiUrl": "/youtubei/v1/playlist/get_add_to_playlist"
									}
								},
								"addToPlaylistServiceEndpoint": {
									"videoId": "OAIqCpqszVw"
								}
							},
							"trackingParams": "CIQCEJSsCRgKIhMIy9r7_bWP_AIV9E1MCB3ggAxe",
							"hasSeparator": true
						}
					},
					{
						"menuServiceItemRenderer": {
							"text": {
								"runs": [
									{
										"text": "Not interested"
									}
								]
							},
							"icon": {
								"iconType": "NOT_INTERESTED"
							},
							"serviceEndpoint": {
								"clickTrackingParams": "CPoBEKQwGAIiEwjL2vv9tY_8AhX0TUwIHeCADF4=",
								"commandMetadata": {
									"webCommandMetadata": {
										"sendPost": true,
										"apiUrl": "/youtubei/v1/feedback"
									}
								},
								"feedbackEndpoint": {
									"feedbackToken": "AB9zfpIYMuqE_G5waNLzdSKtv4O6TSwDl-vJQS6wN0RYHCEJaZ6l9UBHQ8OlD3xAp4PFk4Phdi_7C2zP05nGQMCF_P_4DI4iJZikEilOI5-CJg2SSSlYf_361jHyRo-W70v_YctCmxEs",
									"uiActions": {
										"hideEnclosingContainer": true
									},
									"actions": [
										{
											"clickTrackingParams": "CPoBEKQwGAIiEwjL2vv9tY_8AhX0TUwIHeCADF4=",
											"replaceEnclosingAction": {
												"item": {
													"notificationMultiActionRenderer": {
														"responseText": {
															"accessibility": {
																"accessibilityData": {
																	"label": "Video removed: Programming Language Q&A, December 2022."
																}
															},
															"simpleText": "Video removed"
														},
														"buttons": [
															{
																"buttonRenderer": {
																	"style": "STYLE_BLUE_TEXT",
																	"text": {
																		"simpleText": "Undo"
																	},
																	"serviceEndpoint": {
																		"clickTrackingParams": "CIMCEPBbGAAiEwjL2vv9tY_8AhX0TUwIHeCADF4=",
																		"commandMetadata": {
																			"webCommandMetadata": {
																				"sendPost": true,
																				"apiUrl": "/youtubei/v1/feedback"
																			}
																		},
																		"undoFeedbackEndpoint": {
																			"undoToken": "AB9zfpKPmyPzoUbfVtlWuOiXHxOXLTkOKi1jtjILz55oimAcZQ-c0l0f2ibrxP62SeKqfcmZp6VLRv27r2b_7X93PJx70_vf3UXCcsQYdH3hwOBXLB_sU61X1-rCacOnhvDr00EpvHUS",
																			"actions": [
																				{
																					"clickTrackingParams": "CIMCEPBbGAAiEwjL2vv9tY_8AhX0TUwIHeCADF4=",
																					"undoFeedbackAction": {
																						"hack": true
																					}
																				}
																			]
																		}
																	},
																	"trackingParams": "CIMCEPBbGAAiEwjL2vv9tY_8AhX0TUwIHeCADF4="
																}
															},
															{
																"buttonRenderer": {
																	"style": "STYLE_BLUE_TEXT",
																	"text": {
																		"runs": [
																			{
																				"text": "Tell us why"
																			}
																		]
																	},
																	"serviceEndpoint": {
																		"clickTrackingParams": "CIICEPBbGAEiEwjL2vv9tY_8AhX0TUwIHeCADF4=",
																		"commandMetadata": {
																			"webCommandMetadata": {
																				"sendPost": true
																			}
																		},
																		"signalServiceEndpoint": {
																			"signal": "CLIENT_SIGNAL",
																			"actions": [
																				{
																					"clickTrackingParams": "CIICEPBbGAEiEwjL2vv9tY_8AhX0TUwIHeCADF4=",
																					"signalAction": {
																						"signal": "TELL_US_WHY"
																					}
																				}
																			]
																		}
																	},
																	"trackingParams": "CIICEPBbGAEiEwjL2vv9tY_8AhX0TUwIHeCADF4="
																}
															}
														],
														"trackingParams": "CIECEKW8ASITCMva-_21j_wCFfRNTAgd4IAMXg==",
														"dismissalViewStyle": "DISMISSAL_VIEW_STYLE_COMPACT_TALL"
													}
												}
											}
										}
									]
								}
							},
							"trackingParams": "CPoBEKQwGAIiEwjL2vv9tY_8AhX0TUwIHeCADF4="
						}
					},
					{
						"menuServiceItemRenderer": {
							"text": {
								"runs": [
									{
										"text": "Don't recommend channel"
									}
								]
							},
							"icon": {
								"iconType": "REMOVE"
							},
							"serviceEndpoint": {
								"clickTrackingParams": "CP0BEPLPAxgMIhMIy9r7_bWP_AIV9E1MCB3ggAxe",
								"commandMetadata": {
									"webCommandMetadata": {
										"sendPost": true,
										"apiUrl": "/youtubei/v1/feedback"
									}
								},
								"feedbackEndpoint": {
									"feedbackToken": "AB9zfpKQ0bWrYA8FJiUia29zGGiwmEHaekO0H85fNQhNAaVxD2etHNWM1qgslvDjKdWLcwJ6J7Ot009aVSTr6VcVH1ppb8bcDWgqOILSa9jPNs4MunBCFpbnZoEvG4WjKdj4YP8iMJZs5gMqk-S1GvF3y1sbxSx-EpLyFGNDzH1fqN756E0YtEM",
									"uiActions": {
										"hideEnclosingContainer": true
									},
									"actions": [
										{
											"clickTrackingParams": "CP0BEPLPAxgMIhMIy9r7_bWP_AIV9E1MCB3ggAxe",
											"replaceEnclosingAction": {
												"item": {
													"notificationMultiActionRenderer": {
														"responseText": {
															"runs": [
																{
																	"text": "We won't recommend videos from this channel to you again"
																}
															],
															"accessibility": {
																"accessibilityData": {
																	"label": "We won't recommend videos from this channel to you again"
																}
															}
														},
														"buttons": [
															{
																"buttonRenderer": {
																	"style": "STYLE_BLUE_TEXT",
																	"text": {
																		"simpleText": "Undo"
																	},
																	"serviceEndpoint": {
																		"clickTrackingParams": "CIACEPBbGAAiEwjL2vv9tY_8AhX0TUwIHeCADF4=",
																		"commandMetadata": {
																			"webCommandMetadata": {
																				"sendPost": true,
																				"apiUrl": "/youtubei/v1/feedback"
																			}
																		},
																		"undoFeedbackEndpoint": {
																			"undoToken": "AB9zfpKGe2j3fC63J8oIx3iBO-KCWwG0BcR8ofS2RbmmvB86M7Zz9O4X_Dqbxyqr5B7Qv-sXgH9VT_XKNeK7aKn3Xqh3ISIz26yhOf_iN5d5grjEnePhCfyA4Cp2zx1rkPI3VXdE9YmFce1vaKGLBUFVz1RUFRRBmJzLOc4Q0pmhNU4FDfbna_0",
																			"actions": [
																				{
																					"clickTrackingParams": "CIACEPBbGAAiEwjL2vv9tY_8AhX0TUwIHeCADF4=",
																					"undoFeedbackAction": {
																						"hack": true
																					}
																				}
																			]
																		}
																	},
																	"trackingParams": "CIACEPBbGAAiEwjL2vv9tY_8AhX0TUwIHeCADF4="
																}
															},
															{
																"buttonRenderer": {
																	"style": "STYLE_BLUE_TEXT",
																	"text": {
																		"simpleText": "Learn more"
																	},
																	"trackingParams": "CP8BEPBbGAEiEwjL2vv9tY_8AhX0TUwIHeCADF4=",
																	"command": {
																		"clickTrackingParams": "CP8BEPBbGAEiEwjL2vv9tY_8AhX0TUwIHeCADF4=",
																		"commandMetadata": {
																			"webCommandMetadata": {
																				"url": "//support.google.com/youtube/answer/6342839?hl=en-GB",
																				"webPageType": "WEB_PAGE_TYPE_UNKNOWN",
																				"rootVe": 83769
																			}
																		},
																		"urlEndpoint": {
																			"url": "//support.google.com/youtube/answer/6342839?hl=en-GB",
																			"target": "TARGET_NEW_WINDOW"
																		}
																	}
																}
															}
														],
														"trackingParams": "CP4BEKW8ASITCMva-_21j_wCFfRNTAgd4IAMXg==",
														"dismissalViewStyle": "DISMISSAL_VIEW_STYLE_COMPACT_TALL"
													}
												}
											}
										}
									]
								}
							},
							"trackingParams": "CP0BEPLPAxgMIhMIy9r7_bWP_AIV9E1MCB3ggAxe"
						}
					},
					{
						"menuServiceItemRenderer": {
							"text": {
								"runs": [
									{
										"text": "Report"
									}
								]
							},
							"icon": {
								"iconType": "FLAG"
							},
							"serviceEndpoint": {
								"clickTrackingParams": "CPoBEKQwGAIiEwjL2vv9tY_8AhX0TUwIHeCADF4=",
								"commandMetadata": {
									"webCommandMetadata": {
										"sendPost": true,
										"apiUrl": "/youtubei/v1/flag/get_form"
									}
								},
								"getReportFormEndpoint": {
									"params": "EgtPQUlxQ3Bxc3pWd0ABWABwAXgB2AEA6AEA"
								}
							},
							"trackingParams": "CPoBEKQwGAIiEwjL2vv9tY_8AhX0TUwIHeCADF4="
						}
					}
				],
				"trackingParams": "CPoBEKQwGAIiEwjL2vv9tY_8AhX0TUwIHeCADF4=",
				"accessibility": {
					"accessibilityData": {
						"label": "Action menu"
					}
				},
				"targetId": "watch-related-menu-button"
			}
		},
		"thumbnailOverlays": [
			{
				"thumbnailOverlayResumePlaybackRenderer": {
					"percentDurationWatched": 100
				}
			},
			{
				"thumbnailOverlayTimeStatusRenderer": {
					"text": {
						"accessibility": {
							"accessibilityData": {
								"label": "2 hours, 49 minutes, 27 seconds"
							}
						},
						"simpleText": "2:49:27"
					},
					"style": "DEFAULT"
				}
			},
			{
				"thumbnailOverlayToggleButtonRenderer": {
					"isToggled": false,
					"untoggledIcon": {
						"iconType": "WATCH_LATER"
					},
					"toggledIcon": {
						"iconType": "CHECK"
					},
					"untoggledTooltip": "Watch Later",
					"toggledTooltip": "Added",
					"untoggledServiceEndpoint": {
						"clickTrackingParams": "CPwBEPnnAxgDIhMIy9r7_bWP_AIV9E1MCB3ggAxe",
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
									"addedVideoId": "OAIqCpqszVw",
									"action": "ACTION_ADD_VIDEO"
								}
							]
						}
					},
					"toggledServiceEndpoint": {
						"clickTrackingParams": "CPwBEPnnAxgDIhMIy9r7_bWP_AIV9E1MCB3ggAxe",
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
									"action": "ACTION_REMOVE_VIDEO_BY_VIDEO_ID",
									"removedVideoId": "OAIqCpqszVw"
								}
							]
						}
					},
					"untoggledAccessibility": {
						"accessibilityData": {
							"label": "Watch Later"
						}
					},
					"toggledAccessibility": {
						"accessibilityData": {
							"label": "Added"
						}
					},
					"trackingParams": "CPwBEPnnAxgDIhMIy9r7_bWP_AIV9E1MCB3ggAxe"
				}
			},
			{
				"thumbnailOverlayToggleButtonRenderer": {
					"untoggledIcon": {
						"iconType": "ADD_TO_QUEUE_TAIL"
					},
					"toggledIcon": {
						"iconType": "PLAYLIST_ADD_CHECK"
					},
					"untoggledTooltip": "Add to queue",
					"toggledTooltip": "Added",
					"untoggledServiceEndpoint": {
						"clickTrackingParams": "CPsBEMfsBBgEIhMIy9r7_bWP_AIV9E1MCB3ggAxe",
						"commandMetadata": {
							"webCommandMetadata": {
								"sendPost": true
							}
						},
						"signalServiceEndpoint": {
							"signal": "CLIENT_SIGNAL",
							"actions": [
								{
									"clickTrackingParams": "CPsBEMfsBBgEIhMIy9r7_bWP_AIV9E1MCB3ggAxe",
									"addToPlaylistCommand": {
										"openMiniplayer": false,
										"openListPanel": true,
										"videoId": "OAIqCpqszVw",
										"listType": "PLAYLIST_EDIT_LIST_TYPE_QUEUE",
										"onCreateListCommand": {
											"clickTrackingParams": "CPsBEMfsBBgEIhMIy9r7_bWP_AIV9E1MCB3ggAxe",
											"commandMetadata": {
												"webCommandMetadata": {
													"sendPost": true,
													"apiUrl": "/youtubei/v1/playlist/create"
												}
											},
											"createPlaylistServiceEndpoint": {
												"videoIds": [
													"OAIqCpqszVw"
												],
												"params": "CAQ%3D"
											}
										},
										"videoIds": [
											"OAIqCpqszVw"
										]
									}
								}
							]
						}
					},
					"untoggledAccessibility": {
						"accessibilityData": {
							"label": "Add to queue"
						}
					},
					"toggledAccessibility": {
						"accessibilityData": {
							"label": "Added"
						}
					},
					"trackingParams": "CPsBEMfsBBgEIhMIy9r7_bWP_AIV9E1MCB3ggAxe"
				}
			},
			{
				"thumbnailOverlayNowPlayingRenderer": {
					"text": {
						"runs": [
							{
								"text": "Now playing"
							}
						]
					}
				}
			}
		],
		"accessibility": {
			"accessibilityData": {
				"label": "Programming Language Q&A, December 2022 – 2 hours, 49 minutes – Go to channel – Jonathan Blow - 15K views - 2 days ago – play video"
			}
		},
		"richThumbnail": {
			"movingThumbnailRenderer": {
				"movingThumbnailDetails": {
					"thumbnails": [
						{
							"url": "https://i.ytimg.com/an_webp/OAIqCpqszVw/mqdefault_6s.webp?du=3000&sqp=CMjllZ0G&rs=AOn4CLAnbmJA8VdgaaNsqjmnlzpd4SGQXQ",
							"width": 320,
							"height": 180
						}
					],
					"logAsMovingThumbnail": true
				},
				"enableHoveredLogging": true,
				"enableOverlay": true
			}
		}
	}
};

// RendererContentItem
declare global {
	type RendererContentItem=
		RichItemRendererItem|
		RichSectionRendererItem|
		ContentItemCommentsHeaderRenderer|
		ContentItemCommentThreadRenderer|
		ContinuationItemRenderers|
		CompactVideoRenderers|
		never;
}

// RichGridRenderer
declare global {
	interface RichGridRenderer {
		masthead: {
			[str: string]: {}|undefined;
			videoMastheadAdV3Renderer?: {};
		};
		contents: RendererContentItem[];
	}
}

// ResState
declare global {
	type ResState={
		active: boolean;
		resolver: () => void;
	};
}

export {};

// Seen
declare global {
	interface InjectApi {
		Seen?: {};
	}
}

// port_state
declare global {
	interface InjectApi {
		port_state?: {};
	}
}

// plugin_overlay_element
declare global {
	interface InjectApi {
		plugin_overlay_element?: {};
	}
}

// HTMLMediaElementGainController
declare global {
	interface InjectApi {
		HTMLMediaElementGainController?: {};
		audio_gain_controller?: {};
	}
}

// created_blobs
declare global {
	interface Window {
		created_blobs: Map<string,Blob|MediaSource>;
		active_blob_set: Set<string>;
	}
}

// filter_on_initial_data
declare global {
	interface Window {
		ytPageType?: string;
	}
}

// log_current_video_data
declare global {
	interface Window {
		playlist_arr?: string[];
	}
}

// Elements
declare global {
	interface Window {
		ytd_player?: HTMLElement|null;
		ytd_page_manager?: HTMLElement|null;
		ytd_watch_flexy?: HTMLElement|null;
		yt_playlist_manager?: HTMLElement|null;
		ytd_app?: HTMLElement|null;
	}
}

// log_page_type_change
declare global {
	interface Window {
		page_type_changes?: string[],
	}
}

// dom_observer
declare global {
	interface InjectApi {
		dom_observer?: {};
	}
}


// YTFilterHandlers
declare global {
	interface InjectApi {
		yt_handlers?: {};
	}
}

// URL.createObjectURL Proxy
declare global {
	interface InjectApi {
		blob_create_args_arr?: {};
	}
}

// YTIterateAllBase.update_state
declare global {
	interface InjectApi {
		yt_state_map?: {};
	}
}

// export
declare global {
	interface InjectApi {
		PropertyHandler?: {};
	}
}
