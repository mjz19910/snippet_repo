async function use_page_type_watch_detail() {
	const watch_j_response=(await import("./json/page_type_watch_detail.json")).default;
	const json: typeof watch_j_response=watch_j_response;
	type Json=typeof json;
	type json_d=keyof Json;
	type Je=Json["endpoint"]|JR["endpoint"];
	type JR=Json["response"];
	type json_d_2=keyof JR;
	const je_c: Je=json.endpoint;
	const je_c_2: Je=json.response.endpoint;
	type XX={a: {[U in json_d]: Json[U]};};
	type JR_x={a: {[U in json_d_2]: JR[U]};};
	function use_ecatcher() {
		const watch_j_response=json.response.response;
		let service_param=watch_j_response.responseContext.serviceTrackingParams[3];
		const service_param_t: ServiceParams<"ECATCHER">=service_param;
		const param={
			["client.version"]: service_param.params[0].value,
			["client.name"]: service_param.params[1].value,
			["client.fexp"]: service_param.params[2].value,
		};
		type RemoveFirstMatch<T extends string,U extends string>=T extends `${infer C}${U}${string}`? C:never;
		type NextMatch<T extends string,U extends string>=T extends `${string}${U}${infer C}`? C:never;
		service_param.params[2].value.split(",",1)[0];
		const ss: RemoveFirstMatch<typeof param["client.fexp"],",">="24590921";
		const s2: RemoveFirstMatch<NextMatch<typeof param["client.fexp"],",">,",">="23934970";
		return [service_param_t,param,ss,s2];
	}
	let e_catcher=use_ecatcher();
	const watch_serviceTrackingParams=watch_j_response.response.response.responseContext.serviceTrackingParams;
	let service_param: typeof watch_serviceTrackingParams[0]=watch_serviceTrackingParams[0];
	const service_param_t=service_param;
	service_param.service;
	const sp_0_params=service_param.params;
	type CsiPt=typeof sp_0_params;
	type Pxg<T extends number>=ExtractSingleParamKey<CsiPt[T],CsiPt[T]["key"]>;
	type CsiV={
		c: Pxg<0>["c"];
		cver: Pxg<1>["cver"];
		yt_li: Pxg<2>["yt_li"];
		GetWatchNext_rid: Pxg<3>["GetWatchNext_rid"];
	};
	class ActivateCsi implements CsiV {
		c!: Pxg<0>["c"];
		cver!: Pxg<1>["cver"];
		yt_li!: Pxg<2>["yt_li"];
		GetWatchNext_rid!: Pxg<3>["GetWatchNext_rid"];
		constructor(sp_0_params: CsiPt) {
			for(let i=0;i<sp_0_params.length;i++) {
				let sp_x=sp_0_params[i];
				switch(sp_x.key) {
					case "c": this[sp_x.key]=sp_x.value; break;
					case "cver": this[sp_x.key]=sp_x.value; break;
					case "GetWatchNext_rid": this[sp_x.key]=sp_x.value; break;
					case "yt_li": this[sp_x.key]=sp_x.value; break;
					default: console.log("new params for",service_param.service);
				}
			}
		}
	}
	const csi: CsiV=new ActivateCsi(sp_0_params);
	function use_gfeedback() {
		const watch_j_response=json.response.response;
		let service_param_1=watch_j_response.responseContext.serviceTrackingParams[1];
		const service_param_1_t: RC$GFeedbackServiceParams=service_param_1;
		return service_param_1_t;
	}
	const gfeedback=use_gfeedback();
	function use_guided_help() {
		const watch_j_response=json.response.response;
		let service_param=watch_j_response.responseContext.serviceTrackingParams[2];
		const service_param_t: ServiceParams<"GUIDED_HELP">=service_param;
		type GuideHelpParams_=typeof service_param.params;
		type GuideHelpParamsObj=ExtractParamObj<0,GuideHelpParams_>;
		class ActivateCsi implements GuideHelpParamsObj {
			logged_in: ExtractParamObj<0,GuideHelpParams_>["logged_in"];
			constructor(params: GuideHelpParams_) {
				if(params[0].key==="logged_in") {
					this.logged_in=params[0].value;
				} else {
					throw new Error("missing params");
				}
			}
		}
		const guided_help_params_obj: GuideHelpParamsObj=new ActivateCsi(service_param.params);
		return [
			service_param_t,
			guided_help_params_obj
		];
	}
	const guided_help=use_guided_help();
	return [
		{
			guided_help,
			e_catcher,
			gfeedback,
			csi,
		},
		{
			service_param_t,
		},
		je_c,
		je_c_2,
		class implements XX {a=json;},
		class implements JR_x {a=json.response;},
	];
}
