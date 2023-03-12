namespace YT_Base_source {
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
	class Fo<T> {
		j: T;
		constructor(a: T) {
			this.j=a;
		}
	}
	class Nx<T> {
		j: Fo<T>|null;
		constructor(a: T) {
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
			this.j=a_? new Fo(a):null;
		}
		get(x: string,def: any) {
			this.j.get(a);
		}
	}
	var Ox=function() {
		var a: Nx<"ytidb">|undefined;
		return function() {
			a||(a=new Nx("ytidb"));
			return a;
		};
	}();
	var Px=function() {
		var a;
		return null==(a=Ox())? void 0:a.get("LAST_RESULT_ENTRY_KEY",!0);
	};
	var Zoa=function(): Promise<{}> {
		var a,b,c,d;
		return g.A(function(e) {
			switch(e.j) {
				case 1:
					a=Px();
					if(null==(b=a)? 0:b.hasSucceededOnce)
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
	function $oa(): Promise<{}> {
		if(void 0!==Fy)
			return Fy;
		Vx=!0;
		return Fy=Zoa().then(function(a) {
			Vx=!1;
			var b;
			if(null!=(b=Ox())&&b.j) {
				var c;
				b={
					hasSucceededOnce: (null==(c=Px())? void 0:c.hasSucceededOnce)||a
				};
				var d;
				null==(d=Ox())||d.set("LAST_RESULT_ENTRY_KEY",b,2592E3,!0);
			}
			return a;
		});
	}
	var g={
		ba: (a: string,b: any): void => {a; b;},
		Ca: (a: any,b: any,c?: any): void => {a; b; c;},
		A: function <T>(a: (x2: ia) => any): Promise<T> {
			return maa(new laa(new jaa(a)));
		},
		Wo: function(a: any) {
			var b=new Jo;
			return b.isAvailable()? a? new Vo(b,a):b:null;
		},
	};
	function ka(a) {
		if(a.J)
			throw new TypeError("Generator is already running");
		a.J=!0;
	}
	// var maa=uaa;
	var maa=function <U>(a: laa): Promise<U> {
		function b(d) {
			return a.next(d);
		}
		function c(d) {
			return a.throw(d);
		}
		return new Promise(function(d,e) {
			function f(h) {
				h.done? d(h.value):Promise.resolve(h.value).then(b,c).then(f,e);
			}
			f(a.next());
		}
		);
	};
	function kaa<T>(a: qaa<T>,b: any) {
		ka(a.j);
		var c=a.j.C;
		if(c)
			return sa(a,"return" in c? c["return"]:function(d) {
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
	class laa extends taa_base {
		next: (x?: any) => {value: any,done: false;}|{value: undefined,done: true;};
		throw: (x: any) => {value: any,done: false;}|{value: undefined,done: true;};
		return: (x: any) => {value: any,done: false;}|{value: undefined,done: true;};
		[Symbol.iterator]() {
			return this;
		};
		constructor(a: jaa<any>) {
			super();
			this.next=function(b) {
				ka(a.j);
				let b2;
				a.j.C? b2=sa(a,a.j.C.next,b,a.j.V):(a.j.V(b),b2=ta(a));
				return b2;
			};
			this.throw=function(b) {
				ka(a.j);
				let b2;
				a.j.C? b2=sa(a,a.j.C["throw"],b,a.j.V):(la(a.j,b),
					b2=ta(a));
				return b2;
			};
			this.return=function(b: any) {
				return kaa(a,b);
			};
			this[Symbol.iterator]=function() {
				return this;
			};
		}
	}
	class ia {
		J: boolean;
		C: null;
		u: undefined;
		j: number;
		D: number;
		I: number;
		Y: null;
		B: null;
		constructor() {
			this.J=!1;
			this.C=null;
			this.u=void 0;
			this.j=1;
			this.D=this.I=0;
			this.Y=this.B=null;
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
