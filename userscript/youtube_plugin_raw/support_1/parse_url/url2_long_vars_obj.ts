namespace Url2_long_vars_obj {
	const url2="/youtubei/v1/browse?key=[--snip--]&prettyPrint=false";
	const str=url2;
	const vv=create_from_parse_partial(str);
	let base=new ApiBase();
	const url_key=get_url_params(vv.search,"key");
	const url_prettyPrint=get_url_params(vv.search,"prettyPrint");
	export type url2_long_vars_obj={
		key: typeof url_key;
		prettyPrint: typeof url_prettyPrint;
	};
}