/**
 * @type {<T>(v:any)=>T}
 */
function any(v) {
	return v
}

/**
 * @param {string | any[]} a
 * @param {{}} b
 * @param {string[]} path
 */
function visitor(a,b,path) {
	var results=[]
	for(i=0;i<a.length;i++) {
		var v=a[i]
		var target=Object.getPrototypeOf(v).constructor.name
		if(b.hasOwnProperty(target)) {
			var tmp=any(b)[target].v_it(v,path)
			for(var j=0;j<tmp.length;j++) {
				results.push(tmp[j])
			}
		} else {
			console.log(target)
		}
	}
	return results
}
const visitors_m={}
const visitors={}
visitors.Pe={
	v_it: function(/** @type {any} */ v,/** @type {any} */ vis) {
		void vis
		/**
		 * @type {any[]}
		 */
		var results=[]
		console.log(v)
		return results
	},
}
visitors_m.pn={
	sub: {
		a: {
			once: true,
			sub() {return visitors_m.pn.sub},
			v_it: function(/** @type {{ $children: any; $parent: { _watcher: any; }; _uid: string | number; }} */ v,/** @type {string[]} */ path) {
				var results=[]
				var keys=["_uid","_isVue","$options","_renderProxy"]
				var iter=v.$children
				//console.log(v.$refs)
				if(!this.once) {
					var cur=v.$parent._watcher
					any(window).w_vs(path,cur)
				}
				//this.once = 1
				if(seen_vue_objs.value) {
					seen_vue_objs.value[any(v._uid)]=v
				}
				for(var it of iter) {
					//console.log(it)
					var tmp=visitor([it],any(this.sub()),path)
					results.push(it,tmp)
				}
				return results
			}
		},
		pn: {
			once: true,
			sub: {},
			v_it: function(/** @type {{ $children: any; $parent: { _watcher: any; }; _uid: any; }} */ v,/** @type {string[]} */ path) {
				var results=[]
				var keys=["_uid","_isVue","$options","_renderProxy"]
				var iter=v.$children
				//console.log(v.$refs)
				if(!this.once) {
					var cur=v.$parent._watcher
					any(window).w_vs(path,cur)
				}
				//this.once = 1
				if(seen_vue_objs.value) {
					seen_vue_objs.value[any(v._uid)]=v
				}
				for(var it of iter) {
					//console.log(it)
					var tmp=visitor([it],this.sub,path)
					results.push(it,tmp)
				}
				return results
			}
		}
	},
	v_it: function(/** @type {{ $children: any; _uid: string | number; $store: any; }} */ v,/** @type {string[]} */ path) {
		var results=[]
		var keys=["_uid","_isVue","$options","_renderProxy"]
		var iter=v.$children
		path.push("$children")
		console.log('v_it',keys)
		any(window).seen_vue_objs[v._uid]=v
		for(var it of iter) {
			var tmp=visitor([it],this.sub,path)
			results.push(it,tmp)
		}
		path.pop()
		if(v.$store) {
			path.push("$store")
			var it=v.$store
			var tmp=visitor([it],visitors_store,path)
			results.push(it,tmp)
			path.pop()
		}
		return results
	},
	d: []
}
// cspell:words curnum nextl nvisit recurargs recurwork
let visitors_store={
	sub: {},
	f: {
		v_it: function(/** @type {{ _vm: { _uid: string | number; _watchers: any; }; }} */ v,/** @type {any[]} */ path) {
			if(!any(window).nvisit[v._vm._uid]) {
				var cur=v._vm._watchers
				for(var i=0;i<cur.length;i++) {
					any(window).w_vs(path.join(".")+"._watchers["+i+"]",cur[i])
				}
			}
			return []
		}
	}
}
/**
 * @type {any[]}
 */
let seen_watchers=[]
/**@type {{value:any[]|null}} */
let seen_vue_objs={value: null}
if(typeof any(window).seen_vue_objs=="undefined") {
	seen_vue_objs.value=[]
	any(window).seen_vue_objs=seen_vue_objs.value
}
/**
 * @type {any[]}
 */
let recurwork=[]
/**
 * @type {any[]}
 */
let recurargs=[]
/**
 * @param {string} a
 * @param {{ deps: any; vm: { _uid: string | number; }; }} b
 * @param {number} d
 */
function w_vs(a,b,d=0) {
	if(d>1) {
		return
	}
	var dep=b.deps
	if(a!="unk") {
		any(window).nvisit[b.vm._uid]=b.vm
	} else {
		any(window).nvisit[b.vm._uid]=b.vm
	}
	if(seen_watchers.indexOf(b)!=-1) {
		return
	}
	seen_watchers.push(b)
	console.log(a,b)
	//var rd=dep.filter(e=>{console.log(e.subs[0].id);return e.subs.length > 1})
	var nextl=[]
	dep.forEach(function(/** @type {{ subs: string | any[]; }} */ c,/** @type {any} */ curnum) {
		for(i=1;i<c.subs.length;i++) {
			var cur=c.subs[i]
			if(any(window).recurwork.indexOf(cur)==-1) {
				recurwork.push(cur)
				recurargs.push(curnum,i)
			}
		}
	})
	//console.log(d)
	//console.log(rd)
	for(var i=0;i<recurwork.length;i++) {
		w_vs(a+".deps["+recurargs[i*2]+"].subs["+recurargs[i*2+1]+"]",recurwork[i],d+1)
	}
	if(arguments.length==2) {
		console.log(b)
	}
}
/**
 * @type {any[]}
 */
let nvisit=[]
/**@type {{value:{}|null}} */
let game={value: null}
x: if(any(window).game) {
	game.value=any(window).game
	if(!game.value) break x
	visitor([game.value],visitors_m,["main"])
}
//console.log(nvisit[1]._watchers)
for(let j in nvisit) {
	if(!nvisit[j].hasOwnProperty("_computedWatchers")) {
		var cur=nvisit[j]._watchers
		for(var i=0;i<cur.length;i++) {
			w_vs("vue["+j+"]._watchers["+i+"]",cur[i])
		}
		continue
	}
	for(let i of Object.entries(nvisit[j]._computedWatchers)) {
		w_vs("vue["+j+"]["+i[0]+"]",i[1])
		//console.log(nvisit[1]._watchers.indexOf(i[1]))
	}
}
/**@type {{value:any[]|null}} */
let watch_n={value: null}
x: if(typeof any(window).watch_n=="object") {
	watch_n.value=any(window).watch_n
	if(!watch_n.value) {
		break x
	}
	for(var i=0;i<watch_n.value.length;i++) {
		w_vs("unk"+i,watch_n.value[i])
		console.log(watch_n.value[i])
	}
}
let va=Array.from(new Set(nvisit))
va.splice(0,1)
