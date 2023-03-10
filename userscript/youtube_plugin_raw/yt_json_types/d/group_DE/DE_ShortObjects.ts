//#region Endpoint Data
type DE_AdditionalDatas={additionalDatas: G_AdditionalDataItem[];};
type DE_AddToPlaylistService={videoId: string;};
type DE_AdFeedback={content: R_AdFeedback;};
type DE_BucketIdentifier={bucketIdentifier: "live_chat"; hack: true;};
type DE_CreateBackstagePost={createBackstagePostParams: string;};
type DE_CreateComment={createCommentParams: string;};
type DE_Feedback_ActionItem=C_FilterChipTransform|A_ReplaceEnclosing;
type DE_Feedback={feedbackToken: string; uiActions?: D_HideEnclosingContainer; actions?: DE_Feedback_ActionItem[];};
type DE_GetNotificationMenu={ctoken: string;};
type DE_Like=DE_LikeIndifferent|DE_LikeLike|DE_LikeDislike;
type DE_LikeDislike={status: "DISLIKE"; target: D_LikeApi; dislikeParams: string;};
type DE_LikeIndifferent={status: "INDIFFERENT"; target: D_LikeApi; removeLikeParams?: string;};
type DE_LikeLike={status: "LIKE"; target: D_LikeApi; actions?: C_MusicLibraryStatusUpdate[]; likeParams?: string;};
type DE_MuteAd={type: "HIDE"; actions: A_HideEnclosing[];};
type DE_NotificationOptOut={optOutText: G_Text; serializedOptOut: string; serializedRecordInteractionsRequest: string;};
type DE_PerformCommentAction={action: string; clientActions: A_UpdateCommentVote[];};
type DE_PlaylistDelete=D_PlaylistId;
type DE_PlaylistEdit={actions: GA_Playlist[]; playlistId?: "WL"; params?: string;};
type DE_PlaylistEditor=D_PlaylistId;
type DE_RecordNotificationInteractions={serializedInteractionsRequest: string; actions?: A_HideEnclosing[];};
type DE_Search={params?: string; query: string;};
type DE_Settings={browseId: "SPaccount_overview";};
type DE_ShareEntityService={serializedShareEntity: string; commands: A_ShareEntityService[];};
type DE_ShowEngagementPanel={panelIdentifier: "engagement-panel-searchable-transcript";};
type DE_SignalNavigation=T_Signal<"CHANNEL_SWITCHER"|"LIVE_CONTROL_ROOM">;
type DE_SubmitFeedback=T_Signal<"SUBMIT_FEEDBACK">;
type DE_Subscribe={params: string; channelIds: T_IdTemplate<"UC",D_UserIdStr>[];};
type DE_SuperThanksSelectedTier={key: string; index: number;};
type DE_UndoFeedback={undoToken: string; actions: A_UndoFeedback[];};
type DE_Unsubscribe={params: string; channelIds: T_IdTemplate<"UC",D_UserIdStr>[];};
type DE_Upload=B_Hack;
type DE_VE83769_Url_SearchObj={gclid: string;};
type DE_WatchPlaylist={params: string; playlistId: `RD${string}`; index: 13;};
type DE_WebPlayerShareEntityService={serializedShareEntity: string;};
type DE_YpcGetCart={transactionParams: string;};
//#endregion
//#region Endpoint Data Mutation Union
type DE_MutationDelete={type: T_MutType<"DELETE">; entityKey: string; options: O_DU_Persistence;};
type DE_MutationReplace={type: T_MutType<"REPLACE">; entityKey: string; payload: G_EY_Entity;};
//#endregion