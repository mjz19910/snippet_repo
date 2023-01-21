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
	"ypc_get_offers.params.f5"
];

type $report=[
	"report.params.f25",
	"report.params.f26",
	"report.params.f28.f1.f1.f1.f1.f4",
	"report.params.f28.f1.f1.f1.f1",
	"report.params.f28.f1.f1.f1",
	"report.params.f28.f1.f1.f1[1].f1",
	"report.params.f28.f1.f1.f1[1]",
	"report.params.f28.f1.f1.f1[2].f1",
	"report.params.f28.f1.f1.f1[2].f1",
	"report.params.f28.f1.f1.f1[2]",
	"report.params.f28.f1.f1.f1[3].f1.f4",
	"report.params.f28.f1.f1.f1[3].f1",
	"report.params.f28.f1.f1.f1[3]",
	"report.params.f28.f1.f1.f1[4].f1",
	"report.params.f28.f1.f1.f1[4]",
	"report.params.f28.f1.f1.f1[5].f1",
	"report.params.f28.f1.f1.f1[5]",
	"report.params.f28.f1.f1.f1[6].f1.f4",
	"report.params.f28.f1.f1.f1[6].f1",
	"report.params.f28.f1.f1.f1[6]",
	"report.params.f28.f1.f1.f1[7].f1",
	"report.params.f28.f1.f1.f1[7]",
	"report.params.f28.f1.f1.f1[7]",
	"report.params.f28.f1.f1",
	"report.params.f28.f1.f3",
	"report.params.f28.f1",
	"report.params.f28.f1[1].f1.f1",
	"report.params.f28.f1[1].f1",
	"report.params.f28.f1[1]",
	"report.params.f28"
];

type $sub=[
	"subscribe.params.f2.f1",
	"subscribe.params.f2",
	"subscribe.params.f3",
	"subscribe.params.f4"
][number];

type $entity_key=[
	"entity_key.f2",
	"entity_key.f4",
	"entity_key.f5",
][number];

type $createBackstagePost=[
	"createBackstagePost.param.f1",
	"createBackstagePost.param.f2"
][number];

type P$known$param=[
	$createBackstagePost,
	$entity_key,
	$report[number],
	$sub,
	$ypc_get_offers[number],
	P$tracking$param,
	P$browse$param,
	P$create_playlist$param,
	P$get_transcript$param,
	P$record_notification_interactions$param,
	P$reel$player_param,
	P$report$param,
	P$watch$param,
	P$watch$player_param,
][number];
type P$tracking$param=PE$tracking$param<[
	"click",
	"tracking"
][number]>;