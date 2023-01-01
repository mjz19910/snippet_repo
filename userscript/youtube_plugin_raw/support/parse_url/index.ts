import {AssertUrlParse} from "./A";
import {make_search_params} from "./make_search_params";
import {url2_long_vars_obj} from "./url2_long_vars_obj";
const {A}=AssertUrlParse;
//cspell:disable-next-line
export const url2="/youtubei/v1/browse?key=AIzaSyAO_FJ2SlqU8Q4STEHLGCilw_Y9_11qcW8&prettyPrint=false";
export const vv=create_from_parse_partial(url2);
export const url_pathname_parts_value: url_pathname_parts=vv.pathname.split("/") as url_pathname_parts;
export let res_a=make_search_params(vv.search);
let res_b: url2_long_vars_obj=res_a;
A.assert_equal(res_b,res_a);
