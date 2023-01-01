export const url_test_value_ytimg_vi_jpg="https://i.ytimg.com/vi/OAIqCpqszVw/hqdefault.jpg?sqp=-oaymwE1CKgBEF5IVfKriqkDKAgBFQAAiEIYAXABwAEG8AEB-AH-CYAC0AWKAgwIABABGB8gZShWMA8=&rs=AOn4CLCpqrflce1_k2te4K_5kNbCpjCm6Q";
function test_search_params_test_0() {
	function black_box<T>(v:T) {return v;}
	const str=url_test_value_ytimg_vi_jpg;
	const vv=create_from_parse(str);
	type ru=Decay<ParseUrlSearchParams<typeof vv['search']>>;
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
	console.log(new URL(str));
	if('path' in vv) {
		console.log('vv path', vv.path,new URL(str));
	}
	console.log(vv.pathname,res);
}
test_search_params_test_0();