namespace url2_SearchParams {
	const vv=create_from_parse_partial(url2);
	export type url2_SearchParams_obj=Decay<ParseUrlSearchParams<typeof vv["search"]>>;
}