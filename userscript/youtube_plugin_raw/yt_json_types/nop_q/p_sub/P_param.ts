type P_param_category=P_LogItems extends []? never:P_LogItems[number] extends `[${string}] [${infer U}]`? U:never;
type P_param=Extract<P_param_category,`${string}.params.${string}`>;
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