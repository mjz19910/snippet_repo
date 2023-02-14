namespace Url2_long_vars_obj {
	const url2="/youtubei/v1/browse?key=[--snip--]&prettyPrint=false";
	const str=url2;
	const vv=create_from_parse_partial(str);
	export async function do_test_async() {
		const ApiBase=(await import("../../zc_child_modules/YtPlugin_Base.user.js")).ApiBase;
		class ApiUser extends ApiBase {
			run_test() {
				const url_parsed=this.parse_url_search_params(vv.search);
				return url_parsed;
			}
		}
		return (new ApiUser).run_test();
	}
	const res=do_test_async().then(x => {
		type url2_long_vars_obj={
			key: typeof x.key;
			prettyPrint: typeof x.prettyPrint;
		};
		let tv: url2_long_vars_obj=x;
		tv=x;
		x=tv;
		return x;
	});
	export type url2_long_vars_obj=Awaited<typeof res>;
}