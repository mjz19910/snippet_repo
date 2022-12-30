import {JsonDataEndpointType} from "../j/JsonDataEndpointType.js";
import {JsonDataResponseType} from "../j/JsonDataResponseType.js";
import {assert_equal_type} from "./assert_equal_type";
import {assert_is_equal_t} from "./assert_is_equal_t.js";
import {make_never} from "./make_never";
import {PageTypeSettings} from "./PageTypeSettings.1.js";


export function no_run_test_page_type_settings(break_it: false) {
	if(break_it===false)
		return;
		type nv=assert_is_equal_t<JsonDataEndpointType,PageTypeSettings['response']['endpoint']>;
		type nv_2=assert_is_equal_t<JsonDataResponseType,PageTypeSettings['response']>;
		
	const nn: never=make_never();
	const xy: nv|nv_2=nn;
	assert_equal_type<never>(nn,xy);
	xy;
}
