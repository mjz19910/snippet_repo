type P_LogItems=[
	"[parse_value.gen_ns] [get_report_form.f2]",
	"[parse_value.gen_ns] [get_report_form.f8]",
	"[parse_value.gen_ns] [get_report_form.f11]",
	"[parse_value.gen_ns] [get_report_form.f14]",
	"[parse_value.gen_ns] [get_report_form.f15]",
	"[parse_value.gen_ns] [get_report_form.f18]",
	"[parse_value.gen_ns] [get_report_form.f18.f1]",
	"[parse_value.gen_ns] [get_report_form.f18.f1.f2]",
	"[parse_value.gen_ns] [get_report_form.f25]",
	"[parse_value.gen_ns] [get_report_form.f26]",
	"[parse_value.gen_ns] [get_report_form.f27]",
	"[parse_value.gen_ns] [get_report_form.f28]",
	"[parse_value.gen_ns] [get_report_form.f29]",
	"[parse_value.gen_ns] [watch.params.f39]",
];
type P_ParamParse_XX=[
	P_PathRootStr,
	P_param_missing,
	P_known_param,
	P_other_known_param,
][number];
type P_PathRootStr=
	|"aadc_guidelines_state_entity_key"
	|"AdServingDataEntry"
	|"browse$param"
	|"create_playlist.params"
	|"createBackstagePost.params"
	|"D_Browse.param"
	|"entity_key.subscribed"
	|"entity_key.normal"
	|"feedback.feedbackToken"
	|"get_report_form"
	|"get_transcript.params"
	|"GetNotificationMenu.ctoken"
	|"like.dislikeParams"
	|"like.likeParams"
	|"like.removeLikeParams"
	|"next.continuation"
	|"next.queue_context_params"
	|"playlist_edit.params"
	|"record_notification_interactions"
	|"reel.params"
	|"reel.player_params"
	|"reel.sequence_params"
	|"reload.continuation"
	|"report.params"
	|"service$create_playlist"
	|"slot_ad_serving_data_entry"
	|"subscribe.params"
	|"subscriptionState.key"
	|"TimedContinuation"
	|"tracking.parentTrackingParams"
	|"tracking.trackingParams"
	|"transcript_target_id.param"
	|"transcriptTrackSelection.serializedParams"
	|"UndoFeedback.undoToken"
	|"watch_page_url.pp"
	|"watch_playlist.params"
	|"watch.params"
	|"watch.player_params"
	|"ypc_get_offers.params"
	|"ypc_get_offline_upsell"
	|"YpcGetCart.transactionParams"
	;
;
type P_param_category=P_LogItems extends []?never:P_LogItems[number] extends `[${string}] [${infer U}]`?U:never;
type P_param_missing=Exclude<P_param_category,P_known_param>;
type P_param=Extract<P_param_category,`${string}.params.${string}`>;
type P_known_like_param=`${LP_LogItems_Str}.${P_known_like_param_paths}`;
type P_known_like_param_paths=[
	"f1.f1",
	"f1",
	"f2",
	"f3",
	"f4.f1",
	"f4.f2",
	"f4",
	"f5.f1",
	"f5.f2",
	"f5",
	"f6.f1",
	"f6.f2",
	"f6",
	"f7"
][number];
type P_known_param=[
	"AdServingDataEntry.f10.f1",
	"AdServingDataEntry.f10.f11",
	"AdServingDataEntry.f10.f6",
	"AdServingDataEntry.f10",
	"AdServingDataEntry.f13",
	"AdServingDataEntry.f14",
	"AdServingDataEntry.f4",
	"AdServingDataEntry.f5",
	"AdServingDataEntry.f6",
	"AdServingDataEntry.f7",
	"AdServingDataEntry.f9.f1",
	"AdServingDataEntry.f9.f2",
	"AdServingDataEntry.f9.f3",
	"AdServingDataEntry.f9",
	"browse$param.f84.f5",
	"browse$param.f84",
	"browse$param.f93.f1",
	"browse$param.f93.f3",
	"browse$param.f93",
	"create_playlist.params.f84.f5",
	"create_playlist.params.f84",
	"createBackstagePost.params.f1",
	"createBackstagePost.params.f2",
	`${"entity_key.subscribed"|"entity_key.normal"}.${"f2"|"f4"|"f5"}`,
	"get_transcript.params.f1",
	"get_transcript.params.f6",
	"GetNotificationMenu.ctoken.f1",
	"record_notification_interactions.f2.f1",
	"record_notification_interactions.f2.f14.f1.f1",
	"record_notification_interactions.f2.f14.f1.f2",
	"record_notification_interactions.f2.f14.f1",
	"record_notification_interactions.f2.f14.f2",
	"record_notification_interactions.f2.f14",
	"record_notification_interactions.f2",
	"record_notification_interactions.f5",
	"reel.params.f1",
	"reel.player_params.f30",
	"reel.player_params.f71",
	"reel.sequence_params.f1",
	"report.params.f11",
	"report.params.f15",
	"report.params.f18.f1.f2",
	"report.params.f18.f1",
	"report.params.f18",
	"report.params.f2",
	"report.params.f25",
	"report.params.f26",
	"report.params.f28.f1.f1.f1.f1.f4",
	"report.params.f28.f1.f1.f1.f1",
	"report.params.f28.f1.f1.f1",
	"report.params.f28.f1.f1.f1[].f1.f4",
	"report.params.f28.f1.f1.f1[].f1",
	"report.params.f28.f1.f1.f1[]",
	"report.params.f28.f1.f1",
	"report.params.f28.f1.f3",
	"report.params.f28.f1",
	"report.params.f28.f1[].f1.f1",
	"report.params.f28.f1[].f1.f1[].f1",
	"report.params.f28.f1[].f1.f1[].f1",
	"report.params.f28.f1[].f1.f1[]",
	"report.params.f28.f1[].f1",
	"report.params.f28.f1[].f3",
	"report.params.f28.f1[]",
	"report.params.f28",
	"report.params.f8",
	"service$create_playlist.f1",
	"slot_ad_serving_data_entry.f1.f1",
	"slot_ad_serving_data_entry.f1.f2",
	"slot_ad_serving_data_entry.f1.f3",
	"slot_ad_serving_data_entry.f1",
	"slot_ad_serving_data_entry.f3.f1",
	"slot_ad_serving_data_entry.f3.f11",
	"slot_ad_serving_data_entry.f3.f6",
	"slot_ad_serving_data_entry.f3",
	"slot_ad_serving_data_entry.f4",
	"subscribe.params.f2.f1",
	"subscribe.params.f2",
	"subscribe.params.f3",
	"subscribe.params.f4",
	"tracking.trackingParams.f10",
	"tracking.trackingParams.f11",
	"tracking.trackingParams.f16.f1",
	"tracking.trackingParams.f16.f2",
	"tracking.trackingParams.f16.f3",
	"tracking.trackingParams.f16.f4.f1",
	"tracking.trackingParams.f16.f4.f2",
	"tracking.trackingParams.f16.f4.f3",
	"tracking.trackingParams.f16.f4",
	"tracking.trackingParams.f16",
	"tracking.trackingParams.f16",
	"tracking.trackingParams.f19.f3",
	"tracking.trackingParams.f4.f2",
	"tracking.trackingParams.f4.f3",
	"tracking.trackingParams.f5",
	"tracking.trackingParams.f7",
	"tracking.trackingParams.f8",
	"transcript_target_id.param.f1",
	"transcript_target_id.param.f2",
	"transcript_target_id.param.f3",
	"watch.params.f12",
	"watch.params.f13",
	"watch.params.f2",
	"watch.params.f24",
	"watch.params.f27.f1",
	"watch.params.f27",
	"watch.params.f3",
	"watch.params.f33.f2",
	"watch.params.f33.f3",
	"watch.params.f33.f4",
	"watch.params.f33.f5",
	"watch.params.f33",
	"watch.params.f56",
	"watch.params.f7",
	"watch.player_params.f12",
	"watch.player_params.f25",
	"watch.player_params.f40.f1.f2",
	"watch.player_params.f40.f1.f3",
	"watch.player_params.f40.f1",
	"watch.player_params.f40",
	"watch.player_params.f8",
	"watch.player_params.f9",
	"ypc_get_offers.params.f1.f1",
	"ypc_get_offers.params.f1.f2",
	"ypc_get_offers.params.f1",
	"ypc_get_offers.params.f3",
	"ypc_get_offers.params.f5.f1",
	"ypc_get_offers.params.f5.f3",
	"ypc_get_offers.params.f5.f5.f1",
	"ypc_get_offers.params.f5.f5",
	"ypc_get_offers.params.f5.f9",
	"ypc_get_offers.params.f5",
][number];
type P_known_service_param=[
	"service$create_playlist.f1",
	"service$create_playlist"
][number];
type P_other_known_param=P_known_service_param|P_tracking_param|P_known_like_param;
type P_tracking_param<T extends string="tracking">=[
	`${T}.parentTrackingParams`,
	`${T}.trackingParams.f1`,
	`${T}.trackingParams.f19.f1`,
	`${T}.trackingParams.f19.f2`,
	`${T}.trackingParams.f19`,
	`${T}.trackingParams.f2`,
	`${T}.trackingParams.f3`,
	`${T}.trackingParams.f4.f1`,
	`${T}.trackingParams.f4.f2`,
	`${T}.trackingParams.f4.f3`,
	`${T}.trackingParams.f4`,
	`${T}.trackingParams.f6.f12`,
	`${T}.trackingParams.f6.f13`,
	`${T}.trackingParams.f6`,
	`${T}.trackingParams.f9`,
	`${T}.trackingParams`
][number];
