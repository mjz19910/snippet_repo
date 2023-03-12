namespace YT_Base_source {
	namespace g {
		//#region done
		export function Rw(_x: any): string|undefined {
			throw 1;
		}
		export function ba(a: string,b: any) {
			a; b;
		}
		export function Ca(a: any,b: any,c?: any) {
			a; b; c;
		}
		export function A<T>(a: (x2: ia) => any): Promise<T|undefined> {
			return maa(new laa(new jaa(a)));
		}
		export function Mh(a: any): string {
			throw new AggregateError([a],"Not implemented");
		}
		export class Do {
			j: Storage;
			constructor(a: Storage) {
				this.j=a;
			}
			set(a: any,b: any) {
				void 0===b? this.j.remove(a):this.j.set(a,g.Mh(b));
			}
			get(a: any): any {
				try {
					var b=this.j.get(a);
				} catch(c) {
					return;
				}
				if(null!==b)
					try {
						return JSON.parse(b);
					} catch(c) {
						throw "Storage: Invalid value was encountered";
					}
			}
			remove(a: any) {
				this.j.remove(a);
			}
		}
		export function Wo(a: any) {
			var b=new Jo;
			return b.isAvailable()? a? new Vo(b,a):b:null;
		}
		var Ow: false=false;
		var Nb: any;
		class Gh {
			j: {cookie: string;};
			constructor(a: Document|null) {
				this.j=a||{
					cookie: ""
				};
			}
			remove(a: any,b: any,c: any) {
				var d=void 0!==this.get(a);
				this.set(a,"",{
					aG: 0,
					path: b,
					domain: c
				});
				return d;
			}
			set(a: any,b: any,c: any) {
				var d: boolean|string=!1;
				if("object"===typeof c) {
					var e=c.X5a;
					d=c.i8||!1;
					var f=c.domain||void 0;
					var h=c.path||void 0;
					var l=c.aG;
				}
				if(/[;=\s]/.test(a))
					throw Error('Invalid cookie name "'+a+'"');
				if(/[;\r\n]/.test(b))
					throw Error('Invalid cookie value "'+b+'"');
				void 0===l&&(l=-1);
				c=f? ";domain="+f:"";
				h=h? ";path="+h:"";
				d=d? ";secure":"";
				l=0>l? "":0==l? ";expires="+(new Date(1970,1,1)).toUTCString():";expires="+(new Date(Date.now()+1E3*l)).toUTCString();
				this.j.cookie=a+"="+b+c+h+l+d+(null!=e? ";samesite="+e:"");
			}
			get(a: any,b?: any) {
				for(var c=a+"=",d=(this.j.cookie||"").split(";"),e=0,f;e<d.length;e++) {
					f=Nb(d[e]);
					if(0==f.lastIndexOf(c,0))
						return f.slice(c.length);
					if(f==a)
						return "";
				}
				return b;
			}
		}
		var Pw=new Gh("undefined"==typeof document? null:document);
		export function Sw(a: any,b: any,c: any) {
			Ow||Pw.remove(""+a,void 0===b? "/":b,void 0===c? "youtube.com":c);
		}
		//#endregion
		export var Dy: any;
		export var oa: any;
		export var y: any;
		export var ra: any;
		export var wla: any;
		export var Qa: any;
		export var Qw: any;
	}
	//#region done
	var Fy: any;
	var Vx: boolean;
	var Qx: any;
	var Ux: any[];
	function Wx(a: any) {
		Vx||(Qx? Qx.lC(a):(Ux.push({
			type: "ERROR",
			payload: a
		}),
			10<Ux.length&&Ux.shift()));
	}
	abstract class So_Base {
		abstract isAvailable(): boolean;
	}
	class So extends So_Base {
		constructor(public x: any) {super();}
		isAvailable(): boolean {return false;};
	}
	//#endregion
	class Nx {
		//#region done
		j: FoBase<any>|null;
		constructor(a: string) {
			let b_; let a_2=a;
			b_1: {
				let b=g.Wo(a);
				b_=b;
				break b_1;
			}
			b_2: {
				let a=new So(a_2||"UserDataSharedStore");
				let b=a.isAvailable()? a:null;
				b_=b;
				break b_2;
			}
			let b=b_; b;
			let a_=b;
			this.j=a_? new (Fo as any)(a):null;
			this.u=window.location.hostname;
		}
		u: string;
		get(a: string,b: any) {
			var c: string|undefined=void 0
				,d=!this.j;
			if(!d)
				try {
					c=this.j!.get(a);
				} catch(e) {
					d=!0;
				}
			if(d&&(c=g.Rw(a))&&(c=unescape(c),
				b))
				try {
					c=JSON.parse(c);
				} catch(e) {
					this.remove(a),
						c=void 0;
				}
			return c;
		}
		//#endregion
		remove(a: any) {
			this.j&&this.j.remove(a);
			g.Sw(a,"/",this.u);
		}
		set(a: any,b: any,c: any,d: any) {
			c=c||31104E3;
			this.remove(a);
			if(this.j)
				try {
					this.j.set(a,b,Date.now()+1E3*c);
					return;
				} catch(f) {}
			var e="";
			if(d)
				try {
					e=escape(g.Mh(b));
				} catch(f) {
					return;
				}
			else
				e=escape(b);
			g.Qw(a,e,c,this.u);
		}
	}
	var Ox__=new Nx("ytidb");
	var Ox=function() {
		return Ox__;
	};
	var Px=function() {
		var a;
		return null==(a=Ox())? void 0:a.get("LAST_RESULT_ENTRY_KEY",!0);
	};
	var Cy: any;
	var Yw: any;
	var Zw: any;
	var Zoa=function(): Promise<{}|undefined> {
		var a,b,c,d;
		return g.A(function(e) {
			switch(e.j) {
				case 1:
					a=Px();
					if(null==(b=a)? 0:(b as any).hasSucceededOnce)
						return e.return(!0);
					if(Cy&&Yw()&&!Zw()||g.Dy)
						return e.return(!1);
					try {
						if(c=self,
							!(c.indexedDB&&c.IDBIndex&&c.IDBKeyRange&&c.IDBObjectStore))
							return e.return(!1);
					} catch(f) {
						return e.return(!1);
					}
					if(!("IDBTransaction" in self&&"objectStoreNames" in IDBTransaction.prototype))
						return e.return(!1);
					g.oa(e,2);
					d={
						actualName: "yt-idb-test-do-not-use",
						publicName: "yt-idb-test-do-not-use",
						userIdentifier: void 0
					};
					return g.y(e,Woa(d,Ey),4);
				case 4:
					return g.y(e,By("yt-idb-test-do-not-use",Ey),5);
				case 5:
					return e.return(!0);
				case 2:
					return g.ra(e),
						e.return(!1);
			}
		});
	};
	var Woa: any;
	var By: any;
	function $oa(): Promise<{}|undefined> {
		if(void 0!==Fy)
			return Fy;
		Vx=!0;
		return Fy=Zoa().then(function(a) {
			Vx=!1;
			var b;
			if(null!=(b=Ox())&&b.j) {
				var c: string|{hasSucceededOnce: any;}|undefined;
				b={
					hasSucceededOnce: (null==(c=Px())? void 0:(c as any).hasSucceededOnce)||a
				};
				var d;
				null==(d=Ox())||d.set("LAST_RESULT_ENTRY_KEY",b,2592E3,!0);
			}
			return a;
		});
	}
	class Eo extends g.Do {
		static Df=g.Do.prototype;
		override get(a: any) {
			if(a=this.u(a)) {
				if(a=a.data,
					void 0===a)
					throw "Storage: Invalid value was encountered";
			} else
				a=void 0;
			return a;
		}
		u(a: any,_b?: any) {
			a=Eo.Df.get.call(this,a);
			if(void 0===a||a instanceof Object)
				return a;
			throw "Storage: Invalid value was encountered";
		}
		override set(a: any,b: any) {
			Eo.Df.set.call(this,a,vla(b));
		}
	}
	class Jo {
		j: Storage|null;
		constructor() {
			var a=null;
			try {
				a=window.localStorage||null;
			} catch(b) {}
			this.j=a;
		}
		isAvailable() {
			if(!this.j)
				return !1;
			try {
				return this.j.setItem("__sak","1"),
					this.j.removeItem("__sak"),
					!0;
			} catch(a) {
				return !1;
			}
		}
	}
	class Vo {
		u: Jo;
		j: string;
		constructor(a: Jo,b: string) {
			this.u=a;
			this.j=b+"::";
		}
	}
	function vla(x: any) {
		x;
		return true;
	}
	interface FoBase<T> {
		j: T;
		set(x: any,v: any,a2?: any): void;
		get(x: any): string;
		remove(x: string): void;
	}
	function Fo<T>(this: FoBase<T>,a: T) {
		this.j=a;
	}
	Fo.Df=Eo.prototype;
	Fo.prototype.u=function u<T>(this: FoBase<T>,a: any,b: any) {
		var c=Fo.Df.u.call(this,a);
		if(c)
			if(!b&&g.wla(c))
				this.remove(a);
			else
				return c;
	};
	Fo.prototype.set=function set<T>(this: FoBase<T>,a: any,b: any,c: any) {
		if(b=vla(b)) {
			if(c) {
				if(c<g.Qa()) {
					this.remove(a);
					return;
				}
				b.expiration=c;
			}
			b.creation=g.Qa();
		}
		Fo.Df.set.call(this,a,b);
	};
	function ka(a: {J: boolean;}) {
		if(a.J)
			throw new TypeError("Generator is already running");
		a.J=!0;
	}
	// var maa=uaa;
	function maa<T>(a: laa<T>): Promise<T|undefined> {
		function b(reason?: any) {
			return a.next(reason);
		}
		function c(value: T|PromiseLike<T>) {
			return a.throw(value);
		}
		function run_promise(d: (value: T|PromiseLike<T>|undefined) => void,e: (reason?: any) => void) {
			function f(h: {value: undefined; done: true;}|{value: T; done: false;}) {
				h.done? d(h.value):Promise.resolve(h.value).then(b,c).then(f,e);
			}
			f(a.next());
		}
		return new Promise(run_promise);
	};
	function la(a: any,b: any) {
		a.B={
			GS: b,
			iU: !0
		};
		a.j=a.I||a.D;
	}
	function ta(a: any) {
		for(;a.j.j;)
			try {
				var b=a.u(a.j);
				if(b)
					return a.j.J=!1,
					{
						value: b.value,
						done: !1
					};
			} catch(c) {
				a.j.u=void 0,
					la(a.j,c);
			}
		a.j.J=!1;
		if(a.j.B) {
			b=a.j.B;
			a.j.B=null;
			if(b.iU)
				throw b.GS;
			return {
				value: b.return,
				done: !0
			};
		}
		return {
			value: void 0,
			done: !0
		};
	}
	function sa(a: any,b: any,c: any,d: any) {
		try {
			var e=b.call(a.j.C,c);
			if(!(e instanceof Object))
				throw new TypeError("Iterator result "+e+" is not an object");
			if(!e.done)
				return a.j.J=!1,
					e;
			var f=e.value;
		} catch(h) {
			return a.j.C=null,
				la(a.j,h),
				ta(a);
		}
		a.j.C=null;
		d.call(a.j,f);
		return ta(a);

	}
	function kaa<T>(a: jaa<T>,b: any) {
		ka(a.j);
		var c=a.j.C;
		if(c)
			return sa(a,"return" in c? c["return"]:function(d: any) {
				return {
					value: d,
					done: !0
				};
			}
				,b,a.j.return);
		a.j.return(b);
		return ta(a);
	}
	// var laa=taa;
	class laa<T> extends taa_base {
		#a: jaa<(b: ia) => T>;
		constructor(a: jaa<(b: ia) => T>) {super(); this.#a=a;}
		next(b?: any): {value: T,done: false;}|{value: undefined,done: true;} {
			let a=this.#a;
			ka(a.j);
			let b2;
			a.j.C? b2=sa(a,a.j.C.next,b,a.j.V):(a.j.V(b),b2=ta(a));
			return b2;
		}
		throw(b: any): {value: T,done: false;}|{value: undefined,done: true;} {
			let a=this.#a;
			ka(a.j);
			let b2;
			a.j.C? b2=sa(a,a.j.C["throw"],b,a.j.V):(la(a.j,b),
				b2=ta(a));
			return b2;
		}
		return(b: any) {
			return kaa(this.#a,b);
		}
		[Symbol.iterator]() {
			return this;
		}
	}
	class ia<YR={},RV={}> {
		// isRunning_
		J: boolean;
		// yieldAllIterator_
		C: {
			next: never;
			throw: never;
		}|null;
		// yieldResult
		u: YR|undefined;
		// nextAddress
		j: number;
		// finallyAddress_
		D: number;
		// catchAddress_
		I: number;
		// finallyContexts_
		Y: null;
		B: {
			return: RV;
		}|null;
		constructor() {
			this.J=!1;
			this.C=null;
			this.u=void 0;
			this.j=1;
			this.D=this.I=0;
			this.Y=this.B=null;
		}
		// JSC$5671_next_
		V(a: YR) {
			this.u=a;
		}
		return(a: RV) {
			this.B={
				return: a
			};
			this.j=this.D;
		}
		// jumpTo
		Ja(a: number) {
			this.j=a;
		}
	}
	// var jaa=qaa;
	class jaa<T> {
		j: ia;
		u: T;
		constructor(a: T) {
			this.j=new ia;
			this.u=a;
		}
	};
	export function __use() {
		$oa().then(function(b): EmptyObj|undefined {
			let b2=b? Ey:void 0;
			b2&&g.Ca("ytglobal.idbToken_",b2);
			return b2;
		});
		Wx({});
	}
}
