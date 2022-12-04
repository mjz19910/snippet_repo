delete sz
delete err_n
function main() {
	[sz,err_n]=(function() {
		var sort_order=["function","object","string","number","symbol","boolean","undefined"]
		var to_add=[]
		var elm=Object.getOwnPropertyNames(window)
		var names=new Set(elm.slice(elm.indexOf("XRWebGLLayer")+1,-27))
		//spell:disable
		names.delete("w_maybe")
		names.delete("protos")
		names.delete("ctors")
		names.delete("dom")
		names.delete("$_")
		names.delete("a")
		names.delete("$nuxt")
		//spell:enable
		var array=Array.from(names)
		void array
		var seen=[]
		var dups=[]
		void dups
		if(typeof ctors=="undefined") {
			ctors=new Set
		}
		if(typeof protos=="undefined") {
			protos=new Set
		}
		if(typeof dom=="undefined") {
			dom=new Set
		}
		if(typeof w_maybe=="undefined") {
			w_maybe=new Set
		}
		if(typeof a=="undefined") {
			var nar=Array.from(names)
			nar.forEach(e => {
				to_add.push(["window"+"."+e,window[e]])
			}
			)
			a=new Map(to_add)
		}
		var ges=0
		var fn=function({get: a,set: b,value: c}) {
			if(a) {
				var res
				try {
					this.push(a())
				} catch(e) {
					ges++
					//console.log(e)
				}
			} else
				this.push(c)
		}
		var i
		var by_of=(a,b) => {
			return sort_order.indexOf(typeof a)-sort_order.indexOf(typeof b)
		}
		void by_of
		void i
		function fnx(cur,a,b) {
			void cur
			var tlk=Array.from(a.keys())
			var tlv=Array.from(a.values())
			var tmp2=[]
			if(b.dep--<=0) {
				return a.size
			}
			for(var id in tlv) {
				var v=tlv[id]
				var k=tlk[id]
				//console.log(k)
				if(seen.indexOf(v)==-1) {
					seen.push(v)
					if(st.log) {
						console.log(k,v)
					}
				}
				//if (k.indexOf(".vm") > 0) {
				//    console.log(k, v)
				//    a.delete(k)
				//    continue
				//}
				//a.delete(k)
				b_l: switch(typeof v) {
					case "function":
						if(!ctors.has(v)) {
							ctors.add(v)
						}
						//a.set(k, v)
						break b_l
					case "object":
						if(v===null) {
							break b_l
						}
						if(v instanceof Element) {
							//a.delete(i)
							if(!dom.has(v)) {
								dom.add(v)
							}
							a.set(k,v)
							break b_l
						}
						if([window,ctors,dom].indexOf(v)>-1) {
							continue
						}
						var _k=Object.getOwnPropertyNames(v).concat(Object.getOwnPropertySymbols(v))
						var cv=v
						if(Object.getPrototypeOf(cv)) {
							if(!protos.has(Object.getPrototypeOf(cv).constructor)) {
								protos.add(Object.getPrototypeOf(cv).constructor)
							}
						} else {//console.log("NO PROTO:", cv)
						}
						var _pd=Object.getOwnPropertyDescriptors(v)
						var _v=Object.values(_pd)
						//var _v = Object.values(v)
						//var _k = Object.keys(v)
						for(var j=0;j<_v.length;j++) {
							var rv=_v[j]
							if(rv.get||rv.set) {
								if(rv.get&&rv.set) {
									w_maybe.add([rv.set,rv.get])
									continue
								}
								if(rv.set) {
									w_maybe.add([rv.set,null])
									continue
								}
								if(rv.get) {
									w_maybe.add([null,rv.get])
									continue
								}
							}
							if(rv.value===null||rv.value===undefined)
								continue
							var cv=rv.value
							if(Object.getPrototypeOf(cv)) {
								if(!protos.has(Object.getPrototypeOf(cv).constructor)) {
									protos.add(Object.getPrototypeOf(cv).constructor)
								}
							} else {//console.log("NO PROTO:", cv)
							}
							if(_k[j]=="vm") {
								//console.log(cv)
								continue
							}
							if(seen.indexOf(cv)==-1) {
								seen.push(cv)
								if(st.log) {//console.log(k+"."+_k[j], cv)

								}
							} else {
								continue
							}
							if(_k[j]=="subs") {
								for(var ri in cv) {
									if(reqs.indexOf(cv[ri])==-1) {
										reqs.push(cv[ri])
										froms.push(k+"."+_k[j]+"["+j+"]")
									}
								}
							}
							if(_k[j]=="deps") {
								if(seen_watchers.indexOf(v)==-1) {
									if(typeof watch_n=="undefined") {
										watch_n=[]
									}
									if(watch_n.indexOf(v)==-1) {
										watch_n.push(v)
									}
									console.log("nsw",k,v)
								} else {
									console.log(seen_watchers.indexOf(v))
								}
								for(var ri in cv) {
									if(ty_ut.indexOf(cv[ri])==-1) {
										ty_ut.push(cv[ri])
										f_ut.push(k+"."+_k[j])
									}
								}
							}
							if(_k[j]=="$refs") {
								console.log(cv)
								if(cv.hasOwnProperty("messages")) {
									console.log(cv.messages)
								}
							}
							//console.log(_k[j])
							if(tlv.indexOf(cv)==-1) {
								if(Number.parseInt(_k[j])>-1) {
									a.set(k+"["+_k[j]+"]",cv)
									a.set(k,v)
								} else {
									a.set(k+"."+_k[j],cv)
									a.set(k,v)
								}
							}
						}
						break b_l
					case "number":
						if(seen.indexOf(v)==-1) {
							seen.push(v)
						}
						//a.set(k, v)
						break
					case "string":
					case "symbol":
						if(seen.indexOf(v)==-1) {
							seen.push(v)
						}
						//a.set(k, v)
						break
					case "boolean":
						if(seen.indexOf(v)==-1) {
							seen.push(v)
						}
						//a.set(k, v)
						break
					case "undefined":
						if(seen.indexOf(v)==-1) {
							seen.push(v)
						}
						break
					default:
						console.log(typeof v)
						break b_l
				}
			}
			return a.size
		}
		var st={}
		st.log=0
		st.dep=1
		var froms=[]
		var reqs=[]
		var ty_ut=[]
		var f_ut=[]
		var c_now=performance.now()
		function check_seen(ck,ar) {
			var n=seen.indexOf(ck[1])
			if(n>=0) {
				if(!ar.has(n)) {
					ar.set(n,[0,ck[0]])
				}
				ar.set(n,[ar.get(n)[0]+1,ar.get(n)[1]])
				return
			}
		}
		void check_seen
		while(st.dep>0) {
			fnx("s.r",a,st)
		}
		st.dep=8
		st.log=0
		while(st.dep>0) {
			fnx("s.r",a,st)
			console.log(c_now-performance.now(),a.size)
		}
		console.log("done_8")
		seen=[]
		st.dep=3
		st.log=0
		while(st.dep>0) {
			fnx("s.r",a,st)
			console.log(c_now-performance.now(),a.size)
		}
		var enc_map=new Map
		void enc_map
		var lm=a
		delete a
		var tmp_arr=[seen.length,lm,ges,seen]
		return tmp_arr
	}
	)()
}
main()
