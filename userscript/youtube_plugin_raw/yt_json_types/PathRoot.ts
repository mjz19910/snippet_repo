type LogItems=[
	"[parse_value.gen_ns] [report.params.f2]",
	"[parse_value.gen_ns] [report.params.f8]",
	"[parse_value.gen_ns] [report.params.f11]",
	"[parse_value.gen_ns] [report.params.f15]",
	"[parse_value.gen_ns] [report.params.f18]",
	"[parse_value.gen_ns] [report.params.f18.f1]",
	"[parse_value.gen_ns] [report.params.f18.f1.f2]",
	"[parse_value.gen_ns] [get_transcript.params.f1]",
	"[parse_value.gen_ns] [reel.player_params.f71]",
	"[parse_value.gen_ns] [watch.params.f7]",
	"[parse_value.gen_ns] [watch.params.f12]",
	"[parse_value.gen_ns] [watch.params.f13]",
	"[parse_value.gen_ns] [watch.params.f27]",
][number];
type PathRoot=[
	"subscribe.params",
	$missing$param,
	create_playlist$param,
	get_transcript$param,
	record_notification_interactions$param,
	reel$player_param,
	report$param,
	unknown$param,
	watch$param,
	watch$player_param,
][number];
type category$param=SplitOnce<SplitOnce<Split<LogItems," ">[1],"[">[1],"]">[0];
type only_param$extract=Extract<category$param,`${string}.params.${string}`>;
type wp_param_ex=Extract<only_param$extract,`watch.params.${string}`>;
type report$param=Extract<only_param$extract,`report.params.${string}`>;
type get_transcript$param=Extract<only_param$extract,`get_transcript.params.${string}`>;
type $missing$param=Split<Exclude<category$param,wp_param_ex|report$param|get_transcript$param|reel$player_param>,".">[0];
