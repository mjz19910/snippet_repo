namespace Url2_long_vars_obj {
	const url2="/youtubei/v1/browse?key=[--snip--]&prettyPrint=false";
	const str=url2;
	const vv=create_from_parse_partial(str);
	const res=make_search_params(vv.search);
	export type url2_long_vars_obj={
		key: typeof res.key;
		prettyPrint: typeof res.prettyPrint;
	};
}