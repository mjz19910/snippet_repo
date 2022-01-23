function react_find_all() {
    var qw, cmap = new Map, fid = 0, emp = new Set();
    var js, cnt = 0;
    function get_const_eq(a, b) {
        return Object.getPrototypeOf(a).constructor == b;
    }
    function json_rep(st, e, o) {
        var all_set = st.all_set
          , all_map = st.all_map
        if (!st.hasOwnProperty("func_map")) {
            st.func_map = new Map()
        }
        if (!st.hasOwnProperty("dom_map")) {
            st.dom_map = new Map()
        }
        var retcp = {};
        if (st.ns > 0) {
            st.ns--;
            if (typeof o != "object") {
                return o
            }
            ;all_set.add(o);
            if (o === window) {
                return "browser_window"
            }
            if (o instanceof HTMLIFrameElement) {
                return o.id ? "iframe_" + o.id : "iframe_" + (fid++)
            }
            if (o instanceof CSSStyleDeclaration) {
                return "style_declaration"
            }
            if (o instanceof Node && (!o == st.target)) {
                var fc = fid++;
                var dname = o.id ? "dom_" + o.id : "dom_gen_id_" + (fc);
                st.dom_map.set(o, [dname, fc]);
                return dname
            }
            if (st.func_map.has(o)) {
                return st.func_map.get(o)
            }
            if (o instanceof Function) {
                //return "raw_function"
            }
            if (get_const_eq(o, NodeList)) {
                var ar = Array.from(o);
                all_map.set(o, ar);
                return ar
            }
            if (all_map.has(o)) {
                return all_map.get(o)
            }
            for (var i in o) {
                if (typeof o[i] == "undefined") {
                    continue
                }
                if (o[i] === null) {
                    continue
                }
                if (Node.prototype.hasOwnProperty(i) && typeof o[i] == "number") {
                    continue
                }
                if (Object.getPrototypeOf(o[i]) == null && o[i].parent == window) {
                    retcp[i] = "window_type_" + (fid++);
                    continue
                }
                if (o[i]instanceof CSSStyleSheet) {
                    retcp[i] = "style_sheet";
                    continue
                }
                if(st.func_map.has(o[i])){
                    retcp[i]=st.func_map.get(o[i])[1]
                    continue
                }
                if (o[i]instanceof Function) {
                    var fname = "func_" + o[i].name + "_" + (fid++)
                    var ffunc={...o[i],func_name:fname}
                    st.func_map.set(o[i], [fname,ffunc]);
                    retcp[i] = ffunc
                    continue;
                    retcp[i] = fname
                }
                if (get_const_eq(o[i], Node)) {
                    var fc = fid++;
                    var dname = o.id ? "dom_" + o.id : "dom_gen_id_" + (fc);
                    st.dom_map.set(o[i], [dname, fc]);
                    retcp[i] = dname;
                    continue
                }
                if (o.tagName && o.tagName == "SCRIPT" && i == "childNodes") {
                    continue
                }
                if (o[i]instanceof Object.getPrototypeOf(Int8Array.prototype).constructor) {
                    continue
                }
                if (o[i] == "") {
                    continue
                }
                if (all_map.has(o[i])) {
                    continue
                }
                retcp[i] = o[i]
            }
            if (retcp.innerText) {
                delete retcp.textContent;
                delete retcp.innerText;
                delete retcp.outerText
            }
            if (retcp.parentElement||retcp.nextElementSibling||retcp.previousElementSibling) {
                delete retcp.parentElement;
                delete retcp.previousElementSibling;
                delete retcp.nextElementSibling;
                delete retcp.innerHTML;
                delete retcp.outerHTML
            }
            if(retcp.documentElement){
                delete retcp.documentElement;
                delete retcp.body
                delete retcp.head
            }
            if(retcp.nextElementSibling){
                delete retcp.nextElementSibling;
                delete retcp.nextSibling
            }
            if(retcp.nextSibling){
                delete retcp.nextSibling
            }
            if (retcp.parentNode) {
                delete retcp.parentNode;
                delete retcp.previousSibling;
                delete retcp.nextSibling;
                delete retcp.firstChild;
                delete retcp.lastChild
            }
            if (retcp.ownerElement) {
                if (all_map.has(retcp.ownerElement)) {
                    delete retcp.ownerElement
                }
            }
            if (retcp.offsetParent) {
                all_map.set(retcp.offsetParent,"f")
                delete retcp.offsetParent
            }
            if (retcp.attributeStyleMap) {
                var ta = [];
                for (var i = 0, sa = o.attributeStyleMap; i < sa.length; i++) {
                    ta[i] = sa[i]
                }
                retcp.attributeStyleMap_c = ta;
                delete retcp.attributeStyleMap
            }
            if (retcp.attributes) {
                var ta = [];
                for (var i = 0, sa = o.attributes; i < sa.length; i++) {
                    ta[i] = sa[i]
                }
                retcp.attributes_c = ta;
                delete retcp.attributes
            }
            if (retcp.classList) {
                var ta = [];
                for (var i = 0, sa = o.classList; i < sa.length; i++) {
                    ta[i] = sa[i]
                }
                retcp.classList_c = ta;
                delete retcp.classList
            }
            if (retcp.ownerDocument) {
                if (all_map.has(o.ownerDocument)) {} else {
                    console.log("cross_document", o.ownerDocument);
                    all_map.set(o.ownerDocument, "cross_document");
                }
                delete retcp.ownerDocument
            }
            all_map.set(o, retcp);
            return retcp
        } else {
            if (typeof o == "object") {
                all_set.add(o);
            }
            return "f"
        }
        ;
    }
    function do_json_stringify_iter(nsl, cmap, trg) {
        var js, cin
        emp.clear()
        try {
            if (get_const_eq(trg, Function)) {
                cin = {
                    target: {...trg},
                    ns: nsl,
                    all_map: cmap,
                    all_set: emp
                };
                js = JSON.stringify(cin.target, json_rep.bind(null, cin));
            }else{
            cin = {
                target: trg,
                ns: nsl,
                all_map: cmap,
                all_set: emp
            };
                js = JSON.stringify(trg, json_rep.bind(null, cin));
            }
        } catch (e) {
            console.info("---ERROR---");
            console.log("ERROR", trg, Array.from(emp), e);
            js = "Error"
        }
        cin.l = js.length;
        Object.defineProperty(cin, "js_g", {
            get: function() {
                return js
            },
            set: function(e) {
                js = e
            }
        });
        Object.defineProperty(cin, "js_o", {
            get: function() {
                return JSON.parse(js)
            },
            set: function(e) {
                js = JSON.stringify(e);
            }
        });
        return cin;
    }
    if (window.cr_getC2Runtime) {
        do {
            js = do_json_stringify_iter(90, cmap, cr_getC2Runtime())
        } while (false);//while(++cnt < 2);
        var retv = exdo_user(cmap)
        var car = []
          , repo = [];
        for (var c = cmap.entries(), j = c.next(), i = 0; !j.done; j = c.next()) {
            i++;
            car.push(j.value[0]);
            repo.push(j.value[1])
        }
        var protos = Array.from(new Set(car.map(e=>Object.getPrototypeOf(e))))
        function get_proto_id(e) {
            var pid = protos.indexOf(Object.getPrototypeOf(e));
            if (pid > 0) {
                return pid
            } else {
                return 0
            }
        }
        ;function do_sort_by_proto(a, b) {
            return get_proto_id(a) - get_proto_id(b)
        }
        car.sort(do_sort_by_proto);
        return js == "Error" ? [protos, "X", car, repo] : [protos, JSON.parse(js.js_g), car, JSON.parse(retv.js_g), js, repo]
    }
    function exdo_user(cmap, o_start) {
        var ps = performance.now()
          , o_new_since = 0
          , found_objs = 0
          , start_objs = 0;
        var cars = []
          , js_inner = {
            js_g: ""
        }
          , tri = []
          , scs = []
          , sc = [];
        for (var c = cmap.keys(), j = c.next(), i = 0; !j.done; i++,
        j = c.next()) {
            cars.push(j.value);
            scs.push(j.value);
            found_objs += 1;
        }
        start_objs = found_objs;
        found_objs = 0;
        for (var car = [], sb = 2, wv = o_start, i = 0; i < (10000 * 120) && sb; i++) {
            var js_inner_p = do_json_stringify_iter(9000, cmap, wv);
            tri.push(wv);
            if (js_inner_p.js_g.length > js_inner.js_g.length) {
                js_inner = js_inner_p
            }
            for (var c = cmap.keys(), j = c.next(), z = 0; !j.done; j = c.next()) {
                z++;
                if (cars.indexOf(j.value) < 0) {
                    car.push(j.value);
                    scs.push(j.value);
                    o_new_since++
                    cars.push(j.value);
                    sc.push(j.value)
                }
            }
            if (sb == 1) {
                return js_inner
            }
            while (true) {
                if (sc.length == 0) {
                    wv = scs.pop()
                } else {
                    wv = sc.pop();
                    if (sc.length == 1) {
                        sc.push(scs.pop())
                    } else {}
                }
                if (wv && tri.indexOf(wv) == -1) {
                    break
                }
                if (scs.length == 0) {
                    sb--;
                    console.log("out of objects, processed", found_objs + o_new_since);
                    break
                }
            }
            if (o_new_since > 0) {
                console.log(wv, "new_found_objs", o_new_since);
                found_objs += o_new_since;
                o_new_since = 0;
            }
            if (performance.now() - ps > 100) {
                ps = performance.now();
                console.log("long_running", wv, "total_objs_processed", found_objs);
                console.log("ilen", js_inner_p.js_g.length);
            }
            if (performance.now() - ps > 100 * 100) {
                console.log("timeout, processed " + found_objs + " objects since iteration start");
                return js_inner
            }
        }
        return js_inner
    }
    return do_json_stringify_iter(40000, cmap, window.$j)
}
react_find_all();
