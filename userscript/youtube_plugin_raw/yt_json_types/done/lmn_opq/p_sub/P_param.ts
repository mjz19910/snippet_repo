type P_param_category=P_LogItems extends []? never:P_LogItems[number] extends `[${string}] [${infer U}]`? U:never;
type P_param_missing=Exclude<P_param_category,P_param_known>;
type P_param=Extract<P_param_category,`${string}.params.${string}`>;
type P_param_known_like=`${LP_LogItems_Str}.${P_param_known_like_paths}`;
type P_param_known_like_paths=[
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
type P_param_known_service=
	|"service$create_playlist.f1"
	|"service$create_playlist"
	;
;
type P_param_other_known=
	|`${"entity_key.subscribed"|"entity_key.normal"}.${"f2"|"f4"|"f5"}`
	|`${"player_state"|"load_markers"|"change_markers_visibility"|"macro_marker_repeat_state"}.entity_key.${"f2"|"f4"|"f5"}`
	|`D_Browse.param.f110.f1.f${keyof B_BinaryBrowseTab}`
	|P_param_known_like
	|P_param_known_service
	|P_param_tracking
	;
;
type P_param_tracking<T extends string="tracking">=[
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