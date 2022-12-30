import {ServiceParams} from "./ServiceParams";
import {watch_serviceTrackingParams} from "./use_service_csi.js";

export function use_ecatcher(service_param: typeof watch_serviceTrackingParams[3]) {
	const service_param_t: ServiceParams<"ECATCHER">=service_param;
	service_param_t;
	const param={
		["client.version"]: service_param.params[0].value,
		["client.name"]: service_param.params[1].value,
		["client.fexp"]: service_param.params[2].value,
	};
	type RemoveFirstMatch<T extends string,U extends string>=T extends `${infer C}${U}${string}` ? C:never;
	type NextMatch<T extends string,U extends string>=T extends `${string}${U}${infer C}` ? C:never;
	service_param.params[2].value.split(",",1)[0];
	const ss:RemoveFirstMatch<typeof param["client.fexp"],",">="24590921";
	const s2:RemoveFirstMatch<NextMatch<typeof param["client.fexp"],",">,",">="23934970";
	return [param,ss,s2] as {}[];
}
