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
	var Zoa = function() {
		var a, b, c, d;
		return g.A(function(e) {
			switch (e.j) {
			case 1:
				a = Px();
				if (null == (b = a) ? 0 : b.hasSucceededOnce)
					return e.return(!0);
				if (Cy && Yw() && !Zw() || g.Dy)
					return e.return(!1);
				try {
					if (c = self,
					!(c.indexedDB && c.IDBIndex && c.IDBKeyRange && c.IDBObjectStore))
						return e.return(!1)
				} catch (f) {
					return e.return(!1)
				}
				if (!("IDBTransaction"in self && "objectStoreNames"in IDBTransaction.prototype))
					return e.return(!1);
				g.oa(e, 2);
				d = {
					actualName: "yt-idb-test-do-not-use",
					publicName: "yt-idb-test-do-not-use",
					userIdentifier: void 0
				};
				return g.y(e, Woa(d, Ey), 4);
			case 4:
				return g.y(e, By("yt-idb-test-do-not-use", Ey), 5);
			case 5:
				return e.return(!0);
			case 2:
				return g.ra(e),
				e.return(!1)
			}
		})
	}
	;
	function $oa() {
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
	var g: {
		ba(a: string,b: any): void;
		Ca(a: any,b: any,c?: any): void;
		A = function(a) {
			return maa(new laa(new jaa(a)))
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
