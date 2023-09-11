import {A_ReplaceEnclosing,A_HideEnclosing,GA_Playlist,A_UndoFeedback} from "../../abc/A.js";
import {B_Hack} from "../../abc/B.js";
import {C_FilterChipTransform,C_MusicLibraryStatusUpdate} from "../../abc/C.js";
import {A_UpdateCommentVote} from "../../e/E.js";
import {G_AdditionalDataItem,G_Text,G_EY_Entity} from "../../ghi/_group.mod/G.js";
import {A_ShareEntityService} from "../../nop_q/Popup.js";
import {T_Signal,T_MutType} from "../../stu/mod/group_T.js";
import {D_HideEnclosingContainer,D_LikeApi} from "../group_D/D.js";
import {D_UserIdStr} from "../mod_D/DU_T/DU.js";
import {T_IdTemplate} from "../mod_D/DU_T/DU_TemplateString.js";

//#region Endpoint Data
export type DE_AdditionalDatas={additionalDatas: G_AdditionalDataItem[];};
export type DE_AddToPlaylistService={videoId: string;};
export type DE_AdFeedback={content: R_AdFeedback;};
export type DE_BucketIdentifier={bucketIdentifier: "live_chat"; hack: true;};
export type DE_CreateBackstagePost={createBackstagePostParams: string;};
export type DE_CreateComment={createCommentParams: string;};
export type DE_Feedback_ActionItem=C_FilterChipTransform|A_ReplaceEnclosing;
export type DE_Feedback={feedbackToken: string; uiActions?: D_HideEnclosingContainer; actions?: DE_Feedback_ActionItem[];};
export type DE_GetNotificationMenu={ctoken: string;};
export type DE_Like=DE_LikeIndifferent|DE_LikeLike|DE_LikeDislike;
export type DE_LikeDislike={status: "DISLIKE"; target: D_LikeApi; dislikeParams: string;};
export type DE_LikeIndifferent={status: "INDIFFERENT"; target: D_LikeApi; removeLikeParams?: string;};
export type DE_LikeLike={status: "LIKE"; target: D_LikeApi; actions?: C_MusicLibraryStatusUpdate[]; likeParams?: string;};
export type DE_MuteAd={type: "HIDE"; actions: A_HideEnclosing[];};
export type DE_NotificationOptOut={optOutText: G_Text; serializedOptOut: string; serializedRecordInteractionsRequest: string;};
export type DE_PerformCommentAction={action: string; clientActions: A_UpdateCommentVote[];};
export type DE_PlaylistDelete=D_PlaylistId;
export type DE_PlaylistEdit={actions: GA_Playlist[]; playlistId?: "WL"; params?: string;};
export type DE_PlaylistEditor=D_PlaylistId;
export type DE_RecordNotificationInteractions={serializedInteractionsRequest: string; actions?: A_HideEnclosing[];};
export type DE_Search={params?: string; query: string;};
export type DE_Settings={browseId: "SPaccount_overview";};
export type DE_ShareEntityService={serializedShareEntity: string; commands: A_ShareEntityService[];};
export type DE_ShowEngagementPanel={panelIdentifier: "engagement-panel-searchable-transcript";};
export type DE_SignalNavigation=T_Signal<"CHANNEL_SWITCHER"|"LIVE_CONTROL_ROOM">;
export type DE_SubmitFeedback=T_Signal<"SUBMIT_FEEDBACK">;
export type DE_Subscribe={params: string; channelIds: T_IdTemplate<"UC",D_UserIdStr>[];};
export type DE_SuperThanksSelectedTier={key: string; index: number;};
export type DE_UndoFeedback={undoToken: string; actions: A_UndoFeedback[];};
export type DE_Unsubscribe={params: string; channelIds: T_IdTemplate<"UC",D_UserIdStr>[];};
export type DE_Upload=B_Hack;
export type DE_VE83769_Url_SearchObj={gclid: string;};
export type DE_WatchPlaylist={params: string; playlistId: `RD${string}`; index: 13;};
export type DE_WebPlayerShareEntityService={serializedShareEntity: string;};
export type DE_YpcGetCart={transactionParams: string;};
//#endregion
//#region Endpoint Data Mutation Union
export type DE_MutationDelete={type: T_MutType<"DELETE">; entityKey: string; options: O_DU_Persistence;};
export type DE_MutationReplace={type: T_MutType<"REPLACE">; entityKey: string; payload: G_EY_Entity;};
//#endregion
