type P$known$param=[
	$createBackstagePost,
	$entity_key,
	$report,
	$subscribe,
	$ypc_get_offers,
	P$tracking$param,
	P$browse$param,
	P$create_playlist$param,
	P$get_transcript$param,
	P$record_notification_interactions$param,
	P$reel$player_param,
	P$watch$param,
	P$watch$player_param,
][number];
type $ypc_get_offers=[
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
	"ypc_get_offers.params",
][number];
type $report=[
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
	`report.params.f28.f1.f1.f1[${1|2|3|4|5|6|7}].f1`,
	`report.params.f28.f1.f1.f1[${1|2|3|4|5|6|7}]`,
	"report.params.f28.f1.f1.f1[3].f1.f4",
	"report.params.f28.f1.f1.f1[6].f1.f4",
	"report.params.f28.f1.f1",
	"report.params.f28.f1.f3",
	"report.params.f28.f1",
	"report.params.f28.f1[1].f1.f1",
	"report.params.f28.f1[1].f1",
	"report.params.f28.f1[1]",
	"report.params.f28",
	"report.params.f8",
	"report.params",
][number];
type $subscribe=[
	"subscribe.params.f2.f1",
	"subscribe.params.f2",
	"subscribe.params.f3",
	"subscribe.params.f4",
	"subscribe.params",
][number];
type $entity_key=[
	"entity_key.f2",
	"entity_key.f4",
	"entity_key.f5",
	"entity_key",
][number];
type $createBackstagePost=[
	"createBackstagePost.param.f1",
	"createBackstagePost.param.f2",
	"createBackstagePost.param",
][number];
type P$get_transcript$param=[
	"get_transcript.params",
	"get_transcript.params.f6",
	"get_transcript.params.f1",
][number];
type P$category$param=P$LogItems[number] extends `[${string}] [${infer U}]`?U:never;
type P$browse$param=[
	"browse$param.f84.f5",
	"browse$param.f84",
	"browse$param.f93",
	"browse$param.f93.f1",
	"browse$param",
	"browse.params",
][number];
type $missing$param=Exclude<P$category$param,P$known$param>;
type only_param$extract=Extract<P$category$param,`${string}.params.${string}`>;
type P$record_notification_interactions$param=[
	"record_notification_interactions.f2.f1",
	"record_notification_interactions.f2.f14.f1.f1",
	"record_notification_interactions.f2.f14.f1.f2",
	"record_notification_interactions.f2.f14.f1",
	"record_notification_interactions.f2.f14.f2",
	"record_notification_interactions.f2.f14",
	"record_notification_interactions.f2",
	"record_notification_interactions.f5",
	"record_notification_interactions",
][number];
type P$reel$player_param=[
	"reel.player_params.f30",
	"reel.player_params.f71",
	"reel.player_params",
	"reel.sequence_params.f1",
	"reel.sequence_params",
][number];
type P$watch$player_param=[
	"watch.player_params.f40.f1.f2",
	"watch.player_params.f40.f1.f3",
	"watch.player_params.f40.f1",
	"watch.player_params.f40",
	"watch.player_params.f8",
	"watch.player_params.f9",
	"watch.player_params",
][number];
type P$tracking$param<T extends string=[
	"click",
	"tracking",
][number]>=[
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
	`${T}.trackingParams`,
][number];
type P$watch$param=[
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
	"watch.params",
][number];
type P$unknown$param=[
	"like.likeParams",
	"like.remove_like_params",
	"next.queue_context_params",
	"playlist_edit.params",
	"tracking.parentTrackingParams",
	"watch_page_url.pp",
	"watch_playlist.params",
][number]; 