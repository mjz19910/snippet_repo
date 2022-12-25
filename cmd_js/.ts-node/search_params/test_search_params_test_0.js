import { url_test_value_ytimg_vi_jpg } from "../raw_data/urls.js";
import { create_from_parse } from "../url_parse/create_from_parse.js";
import { make_search_params } from "./make_search_params.js";
export function test_search_params_test_0() {
    function black_box(v) { return v; }
    const str = url_test_value_ytimg_vi_jpg;
    const vv = create_from_parse(str);
    let res_a = make_search_params(vv.search);
    let ux = black_box(res_a);
    if ('rs' in ux) {
        let t = ux;
        t.rs;
    }
    else {
        console.log(ux);
    }
    let res_d = res_a;
    let res = res_d;
    console.log(new URL(str));
    if ('path' in vv) {
        console.log('vv path', vv.path, new URL(str));
    }
    console.log(vv.pathname, res);
}
(typeof window !== 'undefined' ? window : (global.exports = { meta_imp: [import.meta, typeof this] })).meta_imp = [import.meta, this];
test_search_params_test_0();
//# sourceMappingURL=test_search_params_test_0.js.map