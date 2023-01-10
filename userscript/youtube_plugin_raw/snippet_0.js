import {Base64Binary} from "./yt_json_types/Base64Binary";
import {MyReader} from "./yt_json_types/MyReader";
const decoder=new TextDecoder();
const base64_dec=new Base64Binary();
export class Snippet_0_tmp {
	/** @public @arg {string} x */
	trackingParams(x) {
		this.primitive_of(x,"string");
	}
	/** @private @template T @arg {NonNullable<T>} x @arg {TypeOfType<T>} y */
	primitive_of(x,y) {
		if(typeof x!==y) debugger;
	}
	/** @public @arg {string} x */
	clickTrackingParams(x) {
		this.primitive_of(x,"string");
	}
	/** @private @arg {string} x */
	decode_url_b64(x) {
		x=x.replaceAll("_","/").replaceAll("-","+");
		return base64_dec.decodeByteArray(x);
	}
	/** @public @arg {string} x */
	parse_endpoint_params(x) {
		let arr=this.decode_url_b64(x);
		let reader=new MyReader(arr);
		let res=reader.try_read_any();
		if(!res) return;
		const [f0]=res;
		if(f0[0]!=="child") {
			console.log(f0);
			return;
		}
		console.log(...res);
		let [,field_id,data]=f0;
		reader.pos=data.byteOffset;
		let more=reader.try_read_any(data.byteLength);
		if(more&&!more.find(e => e[0]==="error")) {
			const [f0]=more;
			console.log(
				"parsed_endpoint_param field_id=%o result(%o)={message}",
				field_id,data.length
			);
			console.log("{message}",f0);
		} else {
			console.log(
				"parsed_endpoint_param field_id=%o result(%o)=\"%s\"",
				field_id,data.length,decoder.decode(data)
			);
		}
	}
	/** @private @template {string} S @arg {S} s @template {string} D @arg {D} d @returns {SplitOnce<S,D>} */
	split_string_once(s,d=this.as(",")) {
		if(s==="") {
			/** @type {[]} */
			let r=[];
			/** @type {any} */
			let q=r;
			return this.as(q);
		}
		let i=s.indexOf(d);
		if(i===-1) {
			/** @type {[S]} */
			let r=[s];
			/** @type {any} */
			let q=r;
			return this.as(q);
		}
		let a=s.slice(0,i);
		let b=s.slice(i+d.length);
		/** @type {[string,string]} */
		let r=[a,b];
		/** @type {any} */
		let q=r;
		return this.as(q);
	}
	/** @private @template {string} T @template {string} U @arg {T} x @arg {U} sep @returns {SplitOnce<T,U>[number]|null} */
	drop_separator(x,sep) {
		let v=this.split_string_once(x,sep);
		if(v[0]) return v[0];
		return v[1]??null;
	}
	/** @arg {string} key @arg {string|string[]} x */
	save_string(key,x) {
		key; x;
	}
	/** @public @arg {unknown} x @arg {string|null} r */
	generate_typedef(x,r=null) {
		x; r;
	}
	/** @public @template {[string,null,string]} T @template {`${T[0]}-${string}-${T[2]}`} U @arg {T} ns_arr @arg {U} s */
	save_enum_path(ns_arr,s) {
		// ["", "-artists-row-state-id"]
		let n1=this.split_string_once(s,ns_arr[0]);
		if(!n1[1]) throw new Error();
		let n2=this.drop_separator(n1[1],"-");
		if(!n2) throw new Error();
		let n3=this.drop_separator(this.split_string_once(n2,ns_arr[2])[0],"-");
		if(!n3) throw new Error();
		this.save_string(`ELEMENT::${ns_arr[0]}::@::${ns_arr[2]}`,n3);
	}
	/** @public @arg {unknown} x @arg {string|null} r */
	generate_renderer(x,r) {
		throw new AggregateError(["this.#generate_renderer(x,r);",x,r]);
	}
	/** @private @template {{}} T @arg {T} obj @returns {MaybeKeysArray<T>} */
	get_keys_of(obj) {
		if(!obj) {
			debugger;
		}
		let rq=Object.keys(obj);
		/** @type {any} */
		let ra=rq;
		return ra;
	}
	/** @public @template U @template {U} T @arg {U} e @arg {any} [x] @returns {T} */
	as(e,x=e) {
		return x;
	}
	/** @private @template {{}} T @arg {Maybe<T>} x @returns {x is T} */
	maybe_has_value(x) {
		return Object.keys(x).length>0;
	}
	/** @protected @template {{}} T @arg {Maybe<T>} x @arg {(x:T)=>void} f */
	maybe(x,f) {
		if(!this.maybe_has_value(x)) return;
		f(x);
	}
	/** @protected @template {string} T @arg {T} t @returns {ParseUrlSearchParams<T>} */
	make_search_params(t) {
		let sp=new URLSearchParams(t);
		return this.as(Object.fromEntries(sp.entries()));
	}
	/** @protected @template {{}} T @arg {{} extends T?MaybeKeysArray<T> extends []?T:never:never} x */
	g(x) {
		let keys=this.get_keys_of(x);
		if(!keys.length) return;
		console.log("[empty_object] [%s]",keys.join());
		debugger;
	}
	/** @public @template {{}} U @arg {U[]} x @arg {(this:this,x:U,i:number)=>void} y  */
	z(x,y) {
		if(x===void 0) {debugger; return;}
		for(let it of x.entries()) {
			const [i,a]=it;
			if(a===void 0) {debugger; continue;}
			y.call(this,a,i);
		}
	}
	/** @public @template {{}} T @arg {T|undefined} x @arg {(this:this,v:T[MaybeKeysArray<T>[number]],k: MaybeKeysArray<T>[number])=>void} y */
	w(x,y) {
		if(x===void 0) return;
		let keys=this.get_keys_of(x);
		if(keys.length===0) {
			debugger;
			return;
		}
		for(let k of keys) {
			y.call(this,x[k],k);
		}
	}
	/** @protected @template {{}} T @arg {ContentsArrTemplate<T>} x @arg {(this:this,x:T)=>void} f */
	w1(x,f) {
		const {contents: a,...y}=x; this.g(y);
		this.z(a,f);
	}
	/** @protected @template {{}} T @arg {{items:T[]}} x @arg {(this:this,x:T)=>void} f */
	w2(x,f) {
		const {items: a,...y}=x; this.g(y);
		this.z(a,f);
	}
	/** @protected @template {{}} T @arg {{contents:T}} x @arg {(this:this,x:T)=>void} f */
	w3(x,f) {
		f.call(this,x.contents);
	}
	/** @arg {{}} x */
	log_new_typedef(x) {
		let td,rn;
		td=this.generate_typedef(x,"InfoRowData");
		console.log(td);
		td=this.generate_typedef(x,"CLA");
		rn=this.generate_renderer(x,"VideoDescriptionMusicSectionData");
		console.log(rn);
	}
	/** @arg {MyReader} reader @arg {DecTypeNum[]} results */
	unpack_children_reader_result(reader,results) {
		/** @type {DecTypeNum[]} */
		let out=[];
		for(let item of results) {
			switch(item[0]) {
				case "child": {
					let buffer=item[2];
					reader.pos=buffer.byteOffset;
					let res=reader.try_read_any(buffer.byteLength);
					if(!res) {out.push(item); break;}
					let unpack=this.unpack_children_reader_result(reader,res);
					if(!unpack) {out.push(item); break;}
					out.push(["struct",item[1],unpack]);
				} break;
				case "info": break;
				default: out.push(item); break;
				case "error": return null;
			}
		}
		return out;
	}
	/** @public @template {number} T  @arg {T} a @arg {T} b */
	float_cmp(a,b) {
		let epsilon=0.0000001;
		let table=[
			a>(b-epsilon),
			a<(b-epsilon),
			a>(b+epsilon),
			a<(b+epsilon),
			b>(a-epsilon),
			b<(a-epsilon),
			b>(a+epsilon),
			b<(a+epsilon),
		];
		table;
		if(a>(b-epsilon)&&a<(b+epsilon)) return true;
		return false;
	}
	/** @public @template {string} T @template {`${T}_${string}`} U @arg {T} ns @arg {U} x @returns {SplitOnce<SplitOnce<U,T>[1],"_">[1]} */
	parse_enum(ns,x) {
		let r=this.split_string_once(x,ns);
		if(!r[1]) throw new Error("Invalid enum");
		let q=this.split_string_once(r[1],"_");
		return q[1];
	}
	/** @public @template {{}} T @arg {CommandsTemplate<T>} x @arg {(x:T)=>void} f */
	CommandsTemplate(x,f) {
		this.z(x.commands,f);
	}
	/** @public @arg {string} x */
	decode_url_b64_proto_obj(x) {
		x=x.replaceAll("_","/").replaceAll("-","+");
		let ba=base64_dec.decodeByteArray(x);
		let reader=new MyReader(ba);
		return reader.try_read_any();
	}
	/** @public @template T @arg {T|undefined} val @returns {T} */
	non_null(val) {
		if(val===void 0) throw new Error();
		return val;
	}
	/** @type {<T extends string[],U extends string[]>(k:string[] extends T?never:T,r:U)=>Exclude<T[number],U[number]>[]} */
	filter_out_keys(keys,to_remove) {
		to_remove=this.as(to_remove.slice());
		/** @type {Exclude<typeof keys[number],typeof to_remove[number]>[]} */
		let ok_e=[];
		for(let i=0;i<keys.length;i++) {
			if(to_remove.includes(keys[i])) {
				let rm_i=to_remove.indexOf(keys[i]);
				to_remove.splice(rm_i,1);
				continue;
			}
			ok_e.push(this.as(keys[i]));
		}
		return ok_e;
	}
	/** @template {string} C @template {string} U @template {Split<C,",">[number]} _V @template {_V extends U?U[]:never} T @arg {T} ok_3 @arg {Split<C,","> extends U[]?C:never} arg1 */
	has_keys(ok_3,arg1) {
		return this.eq_keys(ok_3,arg1.split(","));
	}
	/** @private @template {string|number} U @template {U[]} T @arg {T} src @arg {T} target */
	eq_keys(src,target) {
		if(src.length!==target.length) return false;
		for(let i=0;i<src.length;i++) {
			let a=src[i];
			if(!target.includes(a)) return false;
		}
		return true;
	}
}