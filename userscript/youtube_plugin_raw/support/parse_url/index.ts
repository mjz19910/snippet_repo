const {A}=AssertUrlParse;
//cspell:disable-next-line
const url_pathname_parts_value: url_pathname_parts=vv.pathname.split("/") as url_pathname_parts;
let res_a=make_search_params(vv.search);
let res_b: url2_long_vars_obj=res_a;
A.assert_equal(res_b,res_a);
