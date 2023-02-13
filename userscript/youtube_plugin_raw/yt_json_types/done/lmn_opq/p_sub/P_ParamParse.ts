type P_LogItems=[
	"[parse_value.gen_ns] [continuation_token.data.f49]",
	"[parse_value.gen_ns] [continuation_token.data.f72]",
	"[parse_value.gen_ns] [continuation_token.data.f1]",
	"[parse_value.gen_ns] [continuation_token.data.f15]",
	`[parse_value.gen_ns] [${"player_state"|"load_markers"|"change_markers_visibility"|"macro_marker_repeat_state"}.entity_key.${"f2"|"f4"|"f5"}]`,
	"[parse_value.gen_ns] [request_continuation.token.f9.f1.f2]",
	"[parse_value.gen_ns] [request_continuation.token.f6.f4.f37]",
	"[parse_value.gen_ns_g1] [request_continuation.token.f9.f1.f4.f13[]]",
	"[parse_value.gen_ns] [request_continuation.token.f9.f1.f4.f13]",
	"[parse_value.gen_ns] [request_continuation.token.f2.f47]",
	"[parse_value.gen_ns] [request_continuation.token.f2.f24]",
];
type P_ParamParse=
	|P_PathRootStr
	|P_param_missing
	|P_param_known
	|P_param_other_known
	;
;
