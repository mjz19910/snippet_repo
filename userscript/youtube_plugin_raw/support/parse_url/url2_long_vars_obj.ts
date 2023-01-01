import {url2} from "./index";
import {make_search_params} from "./make_search_params.js";
const vv=create_from_parse_partial(url2);
const res=make_search_params(vv.search);
export type url2_long_vars_obj={
	key: typeof res.key;
	prettyPrint: typeof res.prettyPrint;
};
