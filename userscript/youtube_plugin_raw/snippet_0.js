import {Base64Binary} from "./support/Base64Binary";
import {KnownDataSaver} from "./support_2/KnownDataSaver";
import {MyReader} from "./support_2/MyReader";
`
const {responseContext: {},actions,trackingParams,...y}=x; this.g(y);
this.z(actions,a => {
	a;
	debugger;
});
this.trackingParams(trackingParams);
`;
export function con_snippet_1() {
	let x={};
	/** @arg {{}} o */
	function nx(o) {
		let u=structuredClone(o);
		/** @arg {{}} x */
		function ru(x) {
			Object.entries(x).forEach(([,v]) => {
				if(typeof v==="object") {
					ru(v);
					Object.setPrototypeOf(v,null);
				}
			});
			return x;
		}
		return ru(u);
	}
	let u=nx(x);
	console.log(u);
}
const decoder=new TextDecoder();
const base64_dec=new Base64Binary();
export let no_storage_access=false;
try {
	localStorage.setItem("test","test_value");
	let r=localStorage.getItem("test");
	if(r!=="test_value") no_storage_access=true;
} catch {
	no_storage_access=true;
}
/** @private @template U @template {U} T @arg {U} e @arg {any} [x] @returns {T} */
function as(e,x=e) {
	return x;
}
/** @private @template {string} S @arg {S} s @template {string} D @arg {D} d @returns {T_SplitOnce<S,D>} */
function split_string_once(s,d=as(",")) {
	if(s==="") {
		/** @type {[]} */
		let r=[];
		/** @type {any} */
		let q=r;
		return as(q);
	}
	let i=s.indexOf(d);
	if(i===-1) {
		/** @type {[S]} */
		let r=[s];
		/** @type {any} */
		let q=r;
		return as(q);
	}
	let a=s.slice(0,i);
	let b=s.slice(i+d.length);
	/** @type {[string,string]} */
	let r=[a,b];
	/** @type {any} */
	let q=r;
	return as(q);
}
class ParserService {
	/** @arg {T_Split<D_ApiUrlFormat$1,"/">} x @returns {Join<T_Split<D_ApiUrlFormat$1,"/">,".">} */
	get_url_type(x) {x; throw 1;}
	/** @public @arg {P_ParamsSection} root @arg {YtUrlFormat} x */
	parse_url(root,x) {root; x;}
	/** @public @arg {P_ParamsSection} root @arg {P_PathRoot} path @arg {string} x */
	on_endpoint_params(root,path,x) {if(x===void 0) {debugger; return;} root; x; path;}
}
class CodegenService {
	/**
	 * @param {{}} x
	 * @param {string} y
	 * @param {boolean | undefined} z
	 */
	codegen_new_typedef(x,y,z) {x; y; z;}
}
export class Snippet_0_tmp {
	/** @template U @template {{}} T @arg {T|undefined} x @arg {(this:this,x:T)=>U} f @returns {U|undefined} */
	t(x,f) {if(!x) return; return f.call(this,x);}
	/** @arg {NavigationEndpoint} x */
	NavigationEndpoint(x) {
		this.save_keys("[NavigationEndpoint]",x);
		let a1=x;
		if("urlEndpoint" in a1) {
		} else if("watchEndpoint" in a1) {
		} else if("browseEndpoint" in a1) {
		} else {
			debugger;
		}
	}
	/** @arg {D_Accessibility} x */
	Accessibility(x) {
		this.save_keys("[Accessibility]",x);
		const {accessibilityData,...y}=x; this.g(y);
		this.AccessibilityData(accessibilityData);
	}
	/** @arg {D_Label} x */
	AccessibilityData(x) {
		this.save_keys("[AccessibilityData]",x);
		const {label,...y}=x; this.g(y);
		if(label) this.primitive_of(label,"string");
	}
	/** @public @arg {P_ParamsSection} root @arg {P_PathRoot} path @arg {string} x */
	params(root,path,x) {
		this.parser.on_endpoint_params(root,path,x);
	}
	/** @public @arg {string} cf @arg {string} x */
	trackingParams(cf,x) {
		this.params(cf,"tracking.trackingParams",x);
	}
	/** @protected @template T @arg {NonNullable<T>} x @arg {T_GetTypeof<T>} y */
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
	split_string_once=split_string_once;
	/** @private @template {string} T @template {string} U @arg {T} x @arg {U} sep @returns {T_SplitOnce<T,U>[number]|null} */
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
	/** @public @template U @template {{}} T @arg {T[]} x @arg {(this:this,x:T,i:number)=>U} f @returns {[Extract<U,{}>[],Extract<U,void>[]]}  */
	z(x,f) {
		if(x===void 0) {debugger; return [[],[]];}
		if(!x.entries) {debugger; return [[],[]];}
		/** @type {any[]} */
		let c=[];
		/** @type {any[]} */
		let v=[];
		for(let it of x.entries()) {
			const [i,a]=it;
			if(a===void 0) {debugger; continue;}
			let u=f.call(this,a,i);
			if(u!==void 0) {
				c.push(u);
			} else if(u===void 0) {
				v.push(u);
			} else {
				throw new Error();
			}
		}
		return [c,v];
	}
	/** @protected @template {{}} T @arg {Record<"contents",T[]>} x @arg {(this:this,x:T)=>void} f */
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
	/** @arg {MyReader} reader @arg {D_DecTypeNum[]} results */
	unpack_children_reader_result(reader,results) {
		/** @type {D_DecTypeNum[]} */
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
	/** @public @template {string} T @template {`${T}_${string}`} U @arg {T} ns @arg {U} x @returns {T_SplitOnce<T_SplitOnce<U,T>[1],"_">[1]} */
	parse_enum(ns,x) {
		let r=this.split_string_once(x,ns);
		if(!r[1]) throw new Error("Invalid enum");
		let q=this.split_string_once(r[1],"_");
		return q[1];
	}
	/** @public @template {{}} T @arg {{commands:T[]}} x @arg {(x:T)=>void} f */
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
	/** @template {string} C @template {string} U @template {T_Split<C,",">[number]} _V @template {_V extends U?U[]:never} T @arg {T} ok_3 @arg {T_Split<C,","> extends U[]?C:never} arg1 */
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
	ds=new KnownDataSaver;
	/** @public @type {this['ds']['save_keys']} @arg {`[${string}]`} k @arg {{}|undefined} x */
	save_keys(k,x) {
		this.ds.save_keys(k,x);
	}
	parser=new ParserService;
	codegen=new CodegenService;
	/** @arg {{}} x @arg {string} gen_name @arg {boolean} [ret_val] */
	codegen_new_typedef(x,gen_name,ret_val) {
		return this.codegen.codegen_new_typedef(x,gen_name,ret_val);
	}
	/** @template {string[]} X @arg {X} x @template {string} S @arg {S} s @returns {Join<X,S>} */
	join_string(x,s) {
		if(!x) {debugger;}
		let r=x.join(s);
		return as(r);
	}
	/** @arg {GM_WC} x */
	GenericWebCommandMetadata(x) {
		this.save_keys("[GenericWebCommandMetadata]",x);
		if(!("apiUrl" in x)) return;
		let cx=x.apiUrl;
		switch(x.apiUrl) {
			default: {
				let path_parts=split_string(split_string_once(cx,"/")[1],"/");
				let url_type=this.parser.get_url_type(path_parts);
				if(!url_type) {
					debugger;
					return;
				}
				let url_type_ex=this.join_string(split_string(url_type,"."),"$");
				/** @arg {GM_WC} x */
				this.codegen_new_typedef(x,`_gen_${url_type_ex}`);
				debugger;
			} break;
			case "/youtubei/v1/playlist/create": return this.GeneratedWebCommandMetadata(x);
		}
	}
	/** @arg {GM_WC} x */
	GeneratedWebCommandMetadata(x) {
		if("apiUrl" in x&&"sendPost" in x) {
			const {sendPost,apiUrl}=x;
			this.primitive_of(sendPost,"boolean");
			this.parser.parse_url("GeneratedWebCommandMetadata",apiUrl);
		} else if("rootVe" in x) {
			switch(x.rootVe) {
				case 3832:
				case 3854:
				case 6827:
				case 11487: break;
				case 96368: break;
				default: let rve=((/**@template {number} T @arg {{rootVe:T}} v @return {{rootVe:T}}*/(v) => {
					/** @type {{rootVe:T}} */
					let c=as(v);
					return c;
				}))(x).rootVe;
					rve;
			}
		}
	}
	//#region dispatch_in_progress
	//#endregion
	/** @template {{}} T @arg {T} obj @returns {MaybeKeysArray<T>} */
	get_keys_of(obj) {
		if(!obj) {
			debugger;
		}
		let rq=Object.keys(obj);
		/** @private @type {any} */
		let ra=rq;
		return ra;
	}
	/** @public @template {GetMaybeKeys<T>} SI @template {{}} T @arg {T} x @returns {T[SI]} */
	w(x) {
		let keys=this.get_keys_of(x);
		let k=keys[0];
		let r=x[k];
		return r;
	}
	/** @template {GetMaybeKeys<T>} K @template {{}} T @arg {string} cf @arg {T} x @arg {(x:T[K])=>void} f */
	H$R_(cf,x,f) {
		this.save_keys(`[${cf}Renderer]`,x);
		f.call(this,this.w(x));
	}
	/** @arg {AD_Notification} x */
	AD_Notification(x) {x;}
	/** @protected @template {{}} T @arg {TR_SectionList<T,"comment-item-section", "engagement-panel-comments-section">} x */
	SectionListRendererTemplate(x) {
		const cf="SectionListRendererTemplate";
		this.save_keys(`[${cf}]`,x);
		this.SectionListDataTemplate(this.w(x));
	}
	/** @private @template {{}} T @arg {TR_SectionList<T,"comment-item-section", "engagement-panel-comments-section">['sectionListRenderer']} x */
	SectionListDataTemplate(x) {
		this.save_keys(`[SectionListDataTemplate<"comment-item-section","engagement-panel-comments-section">]`,x);
		this.SectionListItemTemplate(this.w(x));
	}
	/** @private @template {{}} T @arg {TR_ItemSection<T,"comment-item-section","engagement-panel-comments-section">} x */
	SectionListItemTemplate(x) {
		this.ItemSectionDataTemplate(x.itemSectionRenderer,([b,...a]) => {
			this.z(b,a => {a; debugger;});
			let v=this.join_string(a,"-");
			if(v!=="comment-item-section-engagement-panel-comments-section") debugger;
		});
	}
	/** @template CT,T,U @arg {TD_ItemSection_3<CT,T,U>} x @arg {(this:this,x:[CT[],T,U])=>void} f */
	ItemSectionDataTemplate(x,f) {
		const {contents,sectionIdentifier,targetId,trackingParams,...y}=x; this.g(y); // ! #destructure
		f.call(this,[contents,sectionIdentifier,targetId]);
		this.trackingParams("ItemSectionData",trackingParams);
		let k=this.get_keys_of(contents);
		switch(k[0]) {
			default: debugger; break;
		}
	}
}
class ND extends Snippet_0_tmp {
	/** @private @arg {AR_Notification} x */
	R_New(x) {this.H$R_("A_Notification",x,this.AD_Notification);}
	/** @pub @arg {AD_Notification} x */
	D_NewData(x) {x;}
	/** @pub @arg {TE_SignalService<{},{}>} x */
	E_New$Endpoint(x) {x;}
	use() {
		this.R_New({notificationActionRenderer: {trackingParams: "",responseText: {runs: []}}});
	}
	/** @private @arg {E_Browse} x */
	E_Browse(x) {x;}
	/** @private @arg {D_Thumbnail} x */
	D_Thumbnail(x) {x;}
	/** @private @arg {R_TextRuns} x */
	R_TextWithRuns(x) {x;}
	/** @private @arg {R_SimpleText} x */
	R_SimpleText(x) {x;}
	/** @template {D_VideoOwner} T @arg {T} x */
	VideoOwner$Omit(x) {
		const cf="VideoOwner$Omit";
		const {thumbnail,title,subscriptionButton,navigationEndpoint,subscriberCountText,trackingParams,...y}=x;
		this.D_Thumbnail(thumbnail);
		this.R_TextWithRuns(title);
		this.t(subscriptionButton,this.SubscriptionButton);
		this.E_Browse(navigationEndpoint);
		this.t(subscriberCountText,this.R_SimpleText);
		this.trackingParams(cf,trackingParams);
		return y;
	}
	/** @private @arg {D_SubscriptionButton} x */
	SubscriptionButton(x) {
		const cf="SubscriptionButton";
		this.save_keys(`[${cf}]`,x);
		const {type,subscribed,...y}=x; this.g(y); // ! #destructure
		if(type!=="FREE") debugger;
		this.t(subscribed,a => this.primitive_of(a,"boolean"));
	}
	/** @private @arg {string} x */
	primitive_of_string(x) {
		this.primitive_of(x,"string");
	}
	/** @protected @arg {string} x */
	uppercase_first(x) {
		return x[0].toUpperCase()+x.slice(1);
	}
	/** @template T @arg {T[]} x */
	filter_keys(x) {
		let ret=[];
		for(let k of x) {
			if(k==="clickTrackingParams") continue;
			if(k==="commandMetadata") continue;
			ret.push(k);
		}
		if(!ret.length) {
			for(let k of x) {
				if(k==="clickTrackingParams") continue;
				ret.push(k);
			}
		}
		if(!ret.length) {
			for(let k of x) {
				ret.push(k);
			}
		}
		return ret;
	}
	/** @private @arg {{[U in string]: unknown}} x */
	get_codegen_name(x) {
		if(typeof x.type==='string') {
			return x.type.split(".").map(e => {
				if(e.includes("_")) {
					return e.split("_").map(e => this.uppercase_first(e)).join("");
				}
				return this.uppercase_first(e);
			}).join("$");
		}
		let rk=this.filter_keys(this.get_keys_of(x));
		let kk=rk[0];
		return this.uppercase_first(kk);
	}
	/** @private @arg {string} cf @arg {{}} x */
	do_codegen(cf,x) {
		let u_name=this.get_codegen_name(x);
		let gen_name=`${cf}$${u_name}`;
		this.codegen_new_typedef(x,gen_name);
	}
	/** @protected @arg {D_Dropdown_Privacy} x */
	DropdownData(x) {
		const {entries,label,...y}=x; this.g(y); // ! #destructure
		this.primitive_of_string(label);
		this.z(entries,x => {
			if("privacyDropdownItemRenderer" in x) {
				return;
			}
			this.do_codegen("Dropdown",x);
		});
	}
	/** @template {GetMaybeKeys<T>} K @template {{}} T @arg {string} cf @arg {T} x @arg {(x:T[K])=>void} f */
	H_(cf,x,f) {
		this.save_keys(`[${cf}]`,x);
		f.call(this,this.w(x));
	}
	/** @private @arg {R_Button} x */
	R_Button(x) {this.H_("R_Button",x,() => {debugger;});}
	/** @protected @arg {D_AlertWithButton} x */
	D_AlertWithButton(x) {
		const cf="AlertWithButton";
		this.save_keys(`[${cf}]`,x);
		const {type,text,dismissButton,...y}=x; this.g(y); // ! #destructure
		switch(type) {
			case "INFO": break;
			default: debugger;
		}
		this.R_SimpleText(text);
		this.R_Button(dismissButton);
	}
	/** @protected @template {{}} T @arg {(this:this,x:T)=>void} f @returns {(x:T)=>void} */
	c1(f) {return x => f.call(this,x);}
	/** @protected @template {{}} T @arg {{items: T[]}} x @arg {(this:this,x:T)=>void} f */
	ItemsTemplate(x,f) {
		const cf/**/="ItemsTemplate";
		this.save_keys(`[${cf}]`,x);
		this.z(this.w(x),f);
	}
	/** @protected @template {{}} T @arg {Record<"contents",T[]>} x @arg {(this:this,x:T)=>void} f */
	ContentsArrayTemplate(x,f) {
		const cf="ContentsArrayTemplate";
		this.save_keys(`[${cf}]`,x);
		this.z(this.w(x),f);
	}
	/** @protected @template U @template {{}} T @template {Record<"commands",T[]>} C @arg {C} x @arg {(this:this,x:T)=>U} f @returns {[Omit<C, "commands">,[Extract<U, {}>[], Extract<U, void>[]]]}  */
	CommandsTemplate$Omit(x,f) {
		const cf="CommandsTemplate";
		this.save_keys(`[${cf}]`,x);
		const {commands,...y}=x;
		let ca=this.z(commands,f);
		return [y,ca];
	}
	/** @protected @template T @arg {T_Results<T>} x @arg {(this:this,x:T)=>void} f */
	ResultsTemplate(x,f) {
		const cf="ResultsTemplate";
		this.save_keys(`[${cf}]`,x);
		const {results,...y}=x; this.g(y); // ! #destructure
		f.call(this,results);
	}
	/** @private @template T @arg {TD_ContinuationItem_CE<T>} x */
	T$ContinuationItemData(x) {
		const {trigger,...y}=x;
		if(trigger!=="CONTINUATION_TRIGGER_ON_ITEM_SHOWN") debugger;
		return y;
	}
	/** @protected @template T @arg {TR_ContinuationItem_CE<T>} x */
	R_T$ContinuationItem(x) {
		const {continuationItemRenderer,...y}=x; this.g(y);
		return this.w(this.T$ContinuationItemData(continuationItemRenderer));
	}
	/** @protected @template T @arg {T_ShortsSurfaceIdentifier<T>} x */
	I$ShortsSurfaceIdentifier(x) {
		const {surface,tag,...y}=x; this.g(y); // ! #destructure
		if(surface!=="ENGAGEMENT_PANEL_SURFACE_SHORTS") debugger;
		return tag;
	}
	/** @public @template {string} T_Needle @template {string} T_Str @arg {T_Needle} needle @arg {T_Str} str @returns {str is `${T_Needle}${string}`} */
	str_starts_with(needle,str) {
		return str.startsWith(needle);
	}
	/** @private @template T @typedef {{[U in keyof T as `${string&U extends `toggled${infer U1}${infer I1}`?`${Lowercase<U1>}${I1}`:never}`]:T[U]}} RemoveToggled */
	/** @private @template T @typedef {{[U in keyof T as `${string&U extends `untoggled${infer U1}${infer I1}`?`${Lowercase<U1>}${I1}`:never}`]:T[U]}} RemoveUnToggled */
	/** @protected @template {{}} U @arg {U} x @returns {[RemoveToggled<U>,RemoveUnToggled<U>,Omit<U,`toggled${string}`|`untoggled${string}`>]} */
	unwrap_toggled(x) {
		/** @type {RemoveToggled<U>} */
		let tog=as({});
		/** @type {RemoveUnToggled<U>} */
		let untoggled=as({});
		/** @type {Omit<U,`toggled${string}`|`untoggled${string}`>} */
		let other=as({});
		for(let cc of Object.entries(x)) {
			let c1=cc[0];
			if(this.str_starts_with("toggled",c1)) {
				let u1x=split_string_once(c1,"toggled");
				/** @type {any} */
				let ac=u1x[1][0].toLowerCase()+u1x[1].slice(1);
				/** @type {keyof RemoveToggled<U>} */
				let u1=ac;
				tog[u1]=cc[1];
				continue;
			}
			if(this.str_starts_with("untoggled",c1)) {
				let u1x=split_string_once(c1,"untoggled");
				/** @type {any} */
				let ac=u1x[1][0].toLowerCase()+u1x[1].slice(1);
				/** @type {keyof RemoveUnToggled<U>} */
				let u1=ac;
				untoggled[u1]=cc[1];
				continue;
			}
			/** @type {any} */
			let ac=c1;
			/** @type {keyof Omit<U,`toggled${string}`|`untoggled${string}`>} */
			let u1=ac;
			other[u1]=cc[1];
		}
		return [tog,untoggled,other];
	}
	/** @protected @template T @arg {T$Item<T>} x @arg {(x:T)=>void} f */
	ItemTemplate(x,f) {
		const cf="ItemTemplate";
		this.save_keys(`[${cf}]`,x);
		return f.call(this,x.item);
	}
	/** @protected @template K,V @arg {MapTemplate<K,V>} x @arg {(this:this,x:V,k:K)=>void} f */
	MapTemplate(x,f) {
		f.call(this,x.value,x.key);
	}
	/** @protected @template {{}} T @arg {T[]|undefined} x @arg {(this:this,x:T)=>void} f */
	tz(x,f) {
		if(!x) return;
		this.z(x,f);
	}
	/** @protected @template {D_SubscribeButton} T @arg {T} x */
	SubscribeButton$Omit(x) {
		const cf="SubscribeButton";
		this.save_keys(`[${cf}]`,x);
		const {buttonText,subscribed,enabled,type,channelId,showPreferences,subscribedButtonText,unsubscribedButtonText,trackingParams,unsubscribeButtonText,subscribeAccessibility,unsubscribeAccessibility,...y}=x;
		this.primitive_of(subscribed,"boolean");
		this.primitive_of(enabled,"boolean");
		this.primitive_of_string(type);
		this.primitive_of_string(channelId);
		this.primitive_of(showPreferences,"boolean");
		this.R_TextWithRuns(buttonText);
		this.R_TextWithRuns(subscribedButtonText);
		this.R_TextWithRuns(unsubscribedButtonText);
		this.trackingParams(cf,trackingParams);
		this.R_TextWithRuns(unsubscribeButtonText);
		// this.tz(serviceEndpoints,x => {
		// 	if("subscribeEndpoint" in x) return this.E_Subscribe(x);
		// 	if("signalServiceEndpoint" in x) return this.signalServiceEndpoint(x);
		// 	x;
		// 	this.do_codegen(cf,x);
		// 	debugger;
		// });
		this.D_Accessibility(subscribeAccessibility);
		this.D_Accessibility(unsubscribeAccessibility);
		return y;
	}
	/** @private @arg {D_Accessibility} x */
	D_Accessibility(x) {this.H_("A_Accessibility",x,this.D_Label);}
	/** @private @arg {D_Label} x */
	D_Label(x) {this.H_("Label",x,this.primitive_of_string);}
	/** @protected @arg {E_Subscribe} x */
	E_Subscribe(x) {this.H_("E_Subscribe",x,() => 0);}
	/** @protected @template T @arg {TE_SignalService<{},T>} x */
	signalServiceEndpoint(x) {
		this.E_SignalService(x,a => {
			a;
			debugger;
		});
	}
	/** @private @template T @arg {TE_SignalService<{},T>} x @arg {(this:this,x:T)=>void} f */
	E_SignalService(x,f) {
		f.call(this,x.signalServiceEndpoint);
	}
	/** @protected @template {string} T @arg {T_StyleType<T>} x @arg {(this:this,x:T)=>void} f */
	ChipCloudStyle(x,f) {
		const cf="ChipCloudStyle";
		this.save_keys(`[${cf}]`,x);
		const {styleType,...y}=x; this.g(y); // ! #destructure
		f.call(this,styleType);
	}
}
new ND;
