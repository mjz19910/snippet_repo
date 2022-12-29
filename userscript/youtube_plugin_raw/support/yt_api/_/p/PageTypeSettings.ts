import {JsonDataEndpointType} from "../JsonDataEndpointType.js";
import {JsonDataResponseType} from "../JsonDataResponseType.js";
import {SettingsResponse} from "../SettingsResponse";
export type SettingsEndpoint={};
export type PageTypeSettings={
	pageType: "settings";
	endpoint: SettingsEndpoint;
	response: SettingsResponse;
	fromHistory: boolean;
	navigationDoneMs: number;
};
type assert_is_equal_t<T,U>=T extends U ? U extends T ? U :never:never;
type nv=assert_is_equal_t<JsonDataEndpointType,PageTypeSettings['response']['endpoint']>;
type nv_2=assert_is_equal_t<JsonDataResponseType,PageTypeSettings['response']>;

function assert_equal_type<T>(x:T,y:T): [T,T] {return [x,y]}
export function no_run_test_page_type_settings(break_it: false) {
	if(break_it===false) return;
	const nn: never=make_never();
	const xy: nv|nv_2=nn;
	assert_equal_type<never>(nn,xy);
	xy;
}

function make_never(): never {
	throw new Error("Not to be used, just makes a never type we can use to verify equality");
}
