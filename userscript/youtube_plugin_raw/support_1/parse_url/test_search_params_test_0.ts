async function test_search_params_test_0() {
	function make_search_params<T extends string>(t: T): TP_ParseUrlSearchParams<T> {
		let sp=new URLSearchParams(t);
		return Object.fromEntries(sp.entries()) as TP_ParseUrlSearchParams<T>;
	}
	const split_string=(await import("../../zc_child_modules/YtPlugin_Base_Plugin.user.js")).split_string;
	function parse_with_url_parse<T extends string>(str: T): UrlParse<T> {
		let s=new URL(str);
		return s as any as UrlParse<T>;
	}
	const url3_parsed=parse_with_url_parse("https://www.youtubekids.com?source=youtube_web");
	url3_parsed.href;
	function black_box<T>(v: T) {return v;}
	const str=url_test_value_ytimg_vi_jpg;
	const vv=parse_with_url_parse(str);
	const search_str=split_string(vv.search,"?")[1];
	type ru=Decay<TP_ParseUrlSearchParams<typeof search_str>>['rs'];
	let url_rs=get_url_params(search_str,"rs");
	if(url_rs) {
		const rt:ru=url_rs;
		rt;
	} else {
		console.log(ux);
	}
	type decay_t=Decay<typeof url_rs>;
	let res_d: {sqp: any; rs: any;}=url_rs;
	let res: decay_t=res_d;
	console.log(new URL(str));
	if('path' in vv) {
		console.log('vv path',vv.path,new URL(str));
	}
	console.log(vv.pathname,res);
}
test_search_params_test_0();