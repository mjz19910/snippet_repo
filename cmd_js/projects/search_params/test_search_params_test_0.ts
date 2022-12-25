import {url_test_value_ytimg_vi_jpg} from "../raw_data/urls.js";
import {create_from_parse} from "../url_parse/create_from_parse.js";
import {Decay} from "./Decay.js";
import {make_search_params} from "./make_search_params.js";
import {ParseUrlParams} from "./ParseUrlParams.js";

export function test_search_params_test_0() {
	function black_box<T>(v:T) {return v;}
	const vv=create_from_parse(url_test_value_ytimg_vi_jpg);
	type ru=Decay<ParseUrlParams<typeof vv['search']>>;
	let res_a=make_search_params(vv.search);
	let ux:ru=black_box<ru>(res_a);
	if('rs' in ux) {
		type v=typeof ux;
		let t:v=ux;
		t.rs;
	} else {
		console.log(ux);
	}
	type decay_t=Decay<typeof res_a>;
	let res_d: {sqp: any;rs: any}=res_a;
	let res:decay_t=res_d;
	console.log(vv.pathname,res);
}

test_search_params_test_0();