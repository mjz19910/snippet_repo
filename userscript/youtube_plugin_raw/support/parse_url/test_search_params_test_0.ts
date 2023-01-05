function create_from_parse<T extends string>(str:T): UrlParse<T> {
	let s=new URL(str);
	return s as any as UrlParse<T>;
}

function test_search_params_test_0() {
	function black_box<T>(v:T) {return v;}
	const str=url_test_value_ytimg_vi_jpg;
	const vv=create_from_parse(str);
	const search_str=split_string(vv.search,"?")[1];
	type ru=Decay<ParseUrlSearchParams<typeof search_str>>;
	let res_a=make_search_params(search_str);
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