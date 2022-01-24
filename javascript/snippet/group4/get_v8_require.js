run_d = function() {
	let s;
	if (window.d_run) {
		s = window.d_run
	}
	window.d_run = async function(a) {
		let w = debug;
		this.sco = a;
		w.u = undebug;
		window.native_module_scope ??= {
			v8: nodeRequire("v8"),
		};
		let q = window.native_module_scope;
		a.q = q;
		let l = [];
		a.l = l;
		let x;
		w.m = async function(f, b, s) {
			let w = this;
			if (w.aborted) {
				return null;
			}
			w.u(f);
			w(f, `debug.f=${s};debug.s();0`);
			console.log(s);
			w.s = (e)=>{
				s = w.f
			}
			try {
				w.b = b(f);
			} catch (e) {
				w.aborted = true;
				w.e = e;
			}
			return s
		}
		l[0] = x = await w.m(q.v8.Serializer, f=>new f, 'assert');
		//v8.Serializer
		l[1] = x = await w.m(x, f=>f(true), 'lazyError');
		//assert
		l[2] = x = q.require = await w.m(x, f=>f(), 'require');
		//lazyError
		l[3] = q.NativeModule = await w.m(x, f=>f('v8'), 'NativeModule');
		//require
		l[4] = q.primordials = await w.m(q.require, f=>f('v8'), 'primordials');
		//require
	}
	if (s) {
		d_run.sco = s.sco;
	}
	d_run.d = d_run;
	d_run.d({});
	return d_run.sco;
}
run_d();
