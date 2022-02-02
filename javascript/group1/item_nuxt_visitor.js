function visitor(a, b, path) {
	var results = [];
	for(i = 0; i < a.length; i++) {
		var v = a[i];
		var target = Object.getPrototypeOf(v).constructor.name;
		if(b.hasOwnProperty(target)) {
			var tmp = b[target].v_it(v, path);
			for(var j = 0; j < tmp.length; j++) {
				results.push(tmp[j]);
			}
		} else {
			console.log(target);
		}
	}
	return results;
}
visitors_m = {};
visitors = {};
visitors.Pe = {
	v_it: function(v, vis) {
		var results = [];
		console.log(v);
		return results;
	},
};
visitors_m.pn = {
	v_it: function(v, path) {
		var results = [];
		var keys = ["_uid", "_isVue", "$options", "_renderProxy"];
		var iter = v.$children;
		path.push("$children");
		seen_vue_objs[v._uid] = v;
		for(var it of iter) {
			var tmp = visitor([it], this.sub, path);
			results.push(it, tmp);
		}
		path.pop();
		if(v.$store) {
			path.push("$store");
			var it = v.$store;
			var tmp = visitor([it], visitors_store, path);
			results.push(it, tmp);
			path.pop();
		}
		return results;
	},
	d: []
};
// cspell:words curnum nextl nvisit recurargs recurwork
visitors_store = {};
visitors_store.sub = {};
visitors_store.f = {
	v_it: function(v, path) {
		if(!nvisit[v._vm._uid]) {
			var cur = v._vm._watchers;
			for(var i = 0; i < cur.length; i++) {
				w_vs(path.join(".") + "._watchers[" + i + "]", cur[i]);
			}
		}
		return [];
	}
};
visitors_m.pn.sub = {};
visitors_m.pn.sub.a = {
	v_it: function(v, path) {
		var results = [];
		var keys = ["_uid", "_isVue", "$options", "_renderProxy"];
		var iter = v.$children;
		//console.log(v.$refs)
		if(!this.once) {
			var cur = v.$parent._watcher;
			w_vs(path, cur);
		}
		//this.once = 1
		seen_vue_objs[v._uid] = v;
		for(var it of iter) {
			//console.log(it)
			var tmp = visitor([it], this.sub, path);
			results.push(it, tmp);
		}
		return results;
	}
};
visitors_m.pn.sub.pn = {
	v_it: function(v, path) {
		var results = [];
		var keys = ["_uid", "_isVue", "$options", "_renderProxy"];
		var iter = v.$children;
		//console.log(v.$refs)
		if(!this.once) {
			var cur = v.$parent._watcher;
			w_vs(path, cur);
		}
		//this.once = 1
		seen_vue_objs[v._uid] = v;
		for(var it of iter) {
			//console.log(it)
			var tmp = visitor([it], this.sub, path);
			results.push(it, tmp);
		}
		return results;
	}
};
visitors_m.pn.sub.a.sub = visitors_m.pn.sub;
seen_watchers = [];
if(typeof seen_vue_objs == "undefined") {
	seen_vue_objs = [];
}
recurwork = [];
recurargs = [];
w_vs = function(a, b, d) {
	if(arguments.length == 2) {
		d = 0;
	}
	if(d > 1) {
		return;
	}
	var dep = b.deps;
	if(a != "unk") {
		nvisit[b.vm._uid] = b.vm;
	} else {
		nvisit[b.vm._uid] = b.vm;
	}
	if(seen_watchers.indexOf(b) != -1) {
		return;
	}
	seen_watchers.push(b);
	console.log(a, b);
	//var rd=dep.filter(e=>{console.log(e.subs[0].id);return e.subs.length > 1})
	var nextl = [];
	dep.forEach(function(c, curnum) {
		for(i = 1; i < c.subs.length; i++) {
			var cur = c.subs[i];
			if(recurwork.indexOf(cur) == -1) {
				recurwork.push(cur);
				recurargs.push(curnum, i);
			}
		}
	});
	//console.log(d)
	//console.log(rd)
	for(var i = 0; i < recurwork.length; i++) {
		w_vs(a + ".deps[" + recurargs[i * 2] + "].subs[" + recurargs[i * 2 + 1] + "]", recurwork[i], d + 1);
	}
	if(arguments.length == 2) {
		console.log(b);
	}
};
nvisit = [];
visitor([game], visitors_m, ["main"]);
//console.log(nvisit[1]._watchers)
for(j in nvisit) {
	if(!nvisit[j].hasOwnProperty("_computedWatchers")) {
		var cur = nvisit[j]._watchers;
		for(var i = 0; i < cur.length; i++) {
			w_vs("vue[" + j + "]._watchers[" + i + "]", cur[i]);
		}
		continue;
	}
	; for(var i of Object.entries(nvisit[j]._computedWatchers)) {
		w_vs("vue[" + j + "][" + i[0] + "]", i[1]);
		//console.log(nvisit[1]._watchers.indexOf(i[1]))
	}
}
if(typeof watch_n == "object") {
	for(var i = 0; i < watch_n.length; i++) {
		w_vs("unk" + i, watch_n[i]);
		console.log(watch_n[i]);
	}
}
va = Array.from(new Set(nvisit));
va.splice(0, 1);
